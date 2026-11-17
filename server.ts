import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import nodemailer from 'nodemailer';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;
const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const CSRF_SECRET =
  process.env.CSRF_SECRET || crypto.randomBytes(32).toString('hex');
const CONTACT_TO_EMAIL =
  process.env.CONTACT_TO_EMAIL || 'TheFixItDad.info@gmail.com';

const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX_REQUESTS = 8;
const rateBuckets = new Map<string, number[]>();

const ALLOWED_ENQUIRY_TYPES = new Set([
  'Brand Collaboration',
  'Sponsorship Enquiry',
  'Product Review',
  'General Contact',
]);

function generateCsrfToken(): string {
  const timestamp = Date.now().toString(36);
  const nonce = crypto.randomBytes(16).toString('hex');
  const payload = `${timestamp}.${nonce}`;
  const sig = crypto
    .createHmac('sha256', CSRF_SECRET)
    .update(payload)
    .digest('hex');
  return `${payload}.${sig}`;
}

function verifyCsrfToken(token: unknown): boolean {
  if (typeof token !== 'string') return false;
  const parts = token.split('.');
  if (parts.length !== 3) return false;
  const [timestampHex, nonce, providedSig] = parts;
  if (!timestampHex || !nonce || !providedSig) return false;

  const issuedAt = parseInt(timestampHex, 36);
  if (Number.isNaN(issuedAt)) return false;
  // Valid for 4 hours
  if (Date.now() - issuedAt > 4 * 60 * 60 * 1000) return false;

  const expectedSig = crypto
    .createHmac('sha256', CSRF_SECRET)
    .update(`${timestampHex}.${nonce}`)
    .digest('hex');

  const a = Buffer.from(providedSig, 'hex');
  const b = Buffer.from(expectedSig, 'hex');
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

function sanitizeText(input: unknown, maxLength: number): string {
  if (typeof input !== 'string') return '';
  return input
    .replace(/[\u0000-\u001F\u007F]/g, ' ')
    .replace(/[<>]/g, '')
    .trim()
    .slice(0, maxLength);
}

function sanitizeMultiline(input: unknown, maxLength: number): string {
  if (typeof input !== 'string') return '';
  return input
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .replace(/[<>]/g, '')
    .trim()
    .slice(0, maxLength);
}

function isValidEmail(email: string): boolean {
  if (email.length > 254) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const timestamps = (rateBuckets.get(ip) || []).filter(
    (ts) => now - ts < RATE_WINDOW_MS
  );
  if (timestamps.length >= RATE_MAX_REQUESTS) {
    rateBuckets.set(ip, timestamps);
    return false;
  }
  timestamps.push(now);
  rateBuckets.set(ip, timestamps);
  return true;
}

async function startServer() {
  const app = express();
  app.set('trust proxy', 1);
  app.use(express.json({ limit: '32kb' }));

  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({ ok: true });
  });

  app.get('/api/csrf-token', (_req: Request, res: Response) => {
    res.setHeader('Cache-Control', 'no-store');
    res.json({ csrfToken: generateCsrfToken() });
  });

  app.post('/api/contact', async (req: Request, res: Response) => {
    const clientIp = req.ip || req.socket.remoteAddress || 'unknown';

    if (!checkRateLimit(clientIp)) {
      res.status(429).json({
        ok: false,
        error:
          'Too many enquiries sent from this connection. Please wait a few minutes or email TheFixItDad.info@gmail.com directly.',
      });
      return;
    }

    const {
      name: rawName,
      company: rawCompany,
      email: rawEmail,
      enquiryType: rawType,
      message: rawMessage,
      website: honeypot,
      csrfToken,
    } = req.body || {};

    if (!verifyCsrfToken(csrfToken)) {
      res.status(403).json({
        ok: false,
        error:
          'Security verification expired or invalid. Please reload the page and try again.',
      });
      return;
    }

    // Silent reject for automated honeypot bots
    if (typeof honeypot === 'string' && honeypot.trim().length > 0) {
      res.status(400).json({
        ok: false,
        error: 'Submission failed automated spam verification.',
      });
      return;
    }

    const name = sanitizeText(rawName, 120);
    const company = sanitizeText(rawCompany, 140);
    const email = sanitizeText(rawEmail, 254).toLowerCase();
    const enquiryType = sanitizeText(rawType, 60);
    const message = sanitizeMultiline(rawMessage, 3000);

    const fieldErrors: Record<string, string> = {};
    if (name.length < 2) {
      fieldErrors.name = 'Please enter your full name (at least 2 characters).';
    }
    if (!isValidEmail(email)) {
      fieldErrors.email = 'Please provide a valid business or personal email address.';
    }
    if (!ALLOWED_ENQUIRY_TYPES.has(enquiryType)) {
      fieldErrors.enquiryType = 'Please choose a valid enquiry category.';
    }
    if (message.length < 15) {
      fieldErrors.message =
        'Please share a brief overview of your enquiry (at least 15 characters).';
    }

    if (Object.keys(fieldErrors).length > 0) {
      res.status(400).json({
        ok: false,
        error: 'Please review the highlighted fields before submitting.',
        fieldErrors,
      });
      return;
    }

    const submissionRecord = {
      id: crypto.randomUUID(),
      receivedAt: new Date().toISOString(),
      name,
      company: company || 'Independent / Not specified',
      email,
      enquiryType,
      message,
    };

    const smtpHost = process.env.SMTP_HOST?.trim();
    const smtpUser = process.env.SMTP_USER?.trim();
    const smtpPass = process.env.SMTP_PASS?.trim();
    const smtpPort = Number(process.env.SMTP_PORT) || 587;
    const smtpSecure = process.env.SMTP_SECURE === 'true';
    const smtpFrom =
      process.env.SMTP_FROM?.trim() || 'no-reply@thefixitdad.com';

    if (smtpHost && smtpUser && smtpPass) {
      try {
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: smtpPort,
          secure: smtpSecure,
          auth: { user: smtpUser, pass: smtpPass },
        });

        await transporter.sendMail({
          from: `"The Fix It Dad Website" <${smtpFrom}>`,
          to: CONTACT_TO_EMAIL,
          replyTo: email,
          subject: `[The Fix It Dad] ${enquiryType} from ${name}${company ? ` (${company})` : ''}`,
          text: [
            `New ${enquiryType} received via The Fix It Dad website`,
            `Reference ID: ${submissionRecord.id}`,
            `Name: ${name}`,
            `Company: ${submissionRecord.company}`,
            `Email: ${email}`,
            `Type: ${enquiryType}`,
            '',
            'Message:',
            message,
          ].join('\n'),
        });

        res.status(200).json({
          ok: true,
          deliveryMode: 'smtp',
          referenceId: submissionRecord.id,
          message: `Your ${enquiryType.toLowerCase()} has been delivered to ${CONTACT_TO_EMAIL}.`,
        });
        return;
      } catch (err) {
        console.error('SMTP delivery error:', err);
        res.status(502).json({
          ok: false,
          error: `Email relay is temporarily unavailable. Please email ${CONTACT_TO_EMAIL} directly so your enquiry is not missed.`,
        });
        return;
      }
    }

    // Honest server-side recording when SMTP environment credentials are not yet provisioned
    try {
      const logDir = path.join(__dirname, 'data');
      fs.mkdirSync(logDir, { recursive: true });
      fs.appendFileSync(
        path.join(logDir, 'enquiries.jsonl'),
        JSON.stringify(submissionRecord) + '\n',
        'utf-8'
      );

      res.status(202).json({
        ok: true,
        deliveryMode: 'recorded_awaiting_smtp',
        referenceId: submissionRecord.id,
        message: `Enquiry validated and logged (Ref: ${submissionRecord.id.slice(0, 8)}). Direct SMTP mail relay is not configured on this preview server yet—please also send a copy to ${CONTACT_TO_EMAIL} to reach Seth directly.`,
      });
    } catch (err) {
      console.error('Failed to record enquiry:', err);
      res.status(500).json({
        ok: false,
        error: `Could not process the enquiry right now. Please contact ${CONTACT_TO_EMAIL} directly.`,
      });
    }
  });

  if (!IS_PRODUCTION) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.join(__dirname, 'dist');
    const publicDir = path.join(__dirname, 'public');
    if (fs.existsSync(publicDir)) {
      app.use(express.static(publicDir));
    }
    app.use(express.static(distDir));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`The Fix It Dad server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Fatal server startup error:', err);
  process.exit(1);
});
