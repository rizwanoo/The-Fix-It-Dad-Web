export interface SocialChannel {
  id: 'instagram' | 'facebook' | 'youtube' | 'linktree' | 'tiktok';
  name: string;
  handle: string;
  url: string;
  note: string;
}

export interface VideoContentItem {
  id: string;
  title: string;
  category: 'Real Plumbing Projects' | 'Tools & Products' | 'Brand Collaborations' | 'Plumbing Journey';
  image: string;
  summary: string;
  viewsNote?: string;
}

export interface PhotoShowcaseItem {
  id: string;
  title: string;
  category: 'Real Plumbing Projects' | 'Tools & Products' | 'Brand Collaborations' | 'Owner Photography';
  image: string;
  caption: string;
  youtubeId?: string;
}

export const BRAND_PROFILE = {
  brandName: 'THE FIX IT DAD',
  ownerName: 'Seth Williams',
  taglinePrimary: 'Just a Dad, fixing pipes!',
  taglineSecondary: 'Join me on my plumbing journey.',
  roleLine: 'Plumber & Content Creator',
  email: 'TheFixItDad.info@gmail.com',
  instagramMetrics: {
    followers: '18.7K',
    posts: '618',
    youtubeVideos: '195',
    note: 'Instagram figures as supplied on @_thefixitdad; YouTube video count verified on @thefixitdad.',
  },
  logoTransparent: '/assets/images/the-fix-it-dad/brand-identity/the-fix-it-dad-logo-transparent.png',
  logoOriginal: '/assets/images/the-fix-it-dad/brand-identity/the-fix-it-dad-logo-linktree.png',
  youtubeBanner: '/assets/images/the-fix-it-dad/brand-identity/the-fix-it-dad-yt-banner.jpg',
  ferncoBioExact:
    'Seth Williams, known as TheFixItDad, graduated high school and went on to serve the country in the United States Marine Corps. After his service, he struggled to find a satisfying career field but eventually found his way to plumbing and fell in love with the trade. He is also a husband and father of two.',
  ferncoTagline: 'Plumber and U.S. Marine Corps veteran',
  ferncoProfileUrl: 'https://www.fernco.com/about/brand-ambassadors',
  ferncoLogo: '/assets/images/the-fix-it-dad/collaborations/fernco-logo.png',
  shubeeUrl: 'https://www.shubee.com/',
  shubeeLogo: '/assets/images/the-fix-it-dad/collaborations/shubee-logo.svg',
};

export const OWNER_PHOTOS = {
  heroSeth: '/assets/images/the-fix-it-dad/owner-photography/seth-at-shubee-hq-wgJwUktrHcI.jpg',
  ferncoPortrait: '/assets/images/the-fix-it-dad/owner-photography/seth-williams-fernco-portrait.png',
  castIronLadder: '/assets/images/the-fix-it-dad/plumbing-work/cast-iron-pipe-repair-eZiVLGdcUBA.jpg',
  beeArmorStairs: '/assets/images/the-fix-it-dad/collaborations/shubee-bee-armor-stairs-4EXhS69xfb8.jpg',
  hydroShieldSuit: '/assets/images/the-fix-it-dad/collaborations/shubee-suit-showcase-UOcnLcLZ8GI.jpg',
};

export const SOCIAL_CHANNELS: SocialChannel[] = [
  {
    id: 'instagram',
    name: 'Instagram',
    handle: '@_thefixitdad',
    url: 'https://www.instagram.com/_thefixitdad/',
    note: 'Daily jobsite reels, plumbing projects, and trade life.',
  },
  {
    id: 'youtube',
    name: 'YouTube',
    handle: '@thefixitdad',
    url: 'https://youtube.com/@thefixitdad',
    note: '195+ plumbing demonstrations, tool breakdowns, and van tours.',
  },
  {
    id: 'facebook',
    name: 'Facebook',
    handle: 'The Fix It Dad',
    url: 'https://www.facebook.com/profile.php?id=61572275219798',
    note: 'Community updates, project photos, and plumbing clips.',
  },
  {
    id: 'linktree',
    name: 'Linktree',
    handle: 'linktr.ee/TheFixItDad',
    url: 'https://linktr.ee/TheFixItDad',
    note: 'Official hub connecting all social platforms.',
  },
];

export const FEATURED_VIDEOS: VideoContentItem[] = [
  {
    id: 'wgJwUktrHcI',
    title: 'Taking a trip to the ShuBee headquarters',
    category: 'Brand Collaborations',
    image: '/assets/images/the-fix-it-dad/owner-photography/seth-at-shubee-hq-wgJwUktrHcI.jpg',
    summary: 'Behind the scenes at ShuBee HQ exploring surface protection, gloves, and jobsite gear beyond shoe covers.',
  },
  {
    id: 'wZaXh8ivRl4',
    title: 'Press or solder? Choosing the right method for copper',
    category: 'Real Plumbing Projects',
    image: '/assets/images/the-fix-it-dad/plumbing-work/press-or-solder-copper-wZaXh8ivRl4.jpg',
    summary: 'At the back of the work van with a Pipe Vise and MAP-Pro torch breaking down press fittings versus traditional copper soldering.',
  },
  {
    id: 'eZiVLGdcUBA',
    title: 'Making a repair on old cast iron drain pipe',
    category: 'Real Plumbing Projects',
    image: '/assets/images/the-fix-it-dad/plumbing-work/cast-iron-pipe-repair-eZiVLGdcUBA.jpg',
    summary: 'Working inside a framed wall cavity to tie new PVC cleanly into existing cast iron plumbing.',
  },
  {
    id: '4EXhS69xfb8',
    title: 'Keeping customer stairs spotless with ShuBee Bee Armor',
    category: 'Brand Collaborations',
    image: '/assets/images/the-fix-it-dad/collaborations/shubee-bee-armor-stairs-4EXhS69xfb8.jpg',
    summary: 'Rolling out protective runners before hauling heavy plumbing gear through a customer home.',
    viewsNote: 'Active ShuBee Partner Reel',
  },
  {
    id: 'e5KyGfjj1E4',
    title: 'Installing a closet flange the right way',
    category: 'Real Plumbing Projects',
    image: '/assets/images/the-fix-it-dad/plumbing-work/installing-closet-flange-e5KyGfjj1E4.jpg',
    summary: 'Anchoring a Charlotte PVC closet flange solidly into concrete with a Milwaukee hammer drill.',
  },
  {
    id: 'B0wlQMpXLOs',
    title: 'Plumbing van tour: Milwaukee Packout organization',
    category: 'Tools & Products',
    image: '/assets/images/the-fix-it-dad/tools-and-equipment/milwaukee-packout-van-tour-B0wlQMpXLOs.jpg',
    summary: 'Inside the service van showing how parts, Sloan rebuild kits, and tools stay organized for daily calls.',
  },
  {
    id: 'UOcnLcLZ8GI',
    title: 'Hydro Shield suit & ugly gloves in the field',
    category: 'Brand Collaborations',
    image: '/assets/images/the-fix-it-dad/collaborations/shubee-suit-showcase-UOcnLcLZ8GI.jpg',
    summary: 'Full protective suit and heavy-duty gloves geared up outside the work van for messy sewer work.',
  },
  {
    id: '0b1iiYmWhCM',
    title: 'Teaching DWV plumbing layouts with hands-on mockups',
    category: 'Plumbing Journey',
    image: '/assets/images/the-fix-it-dad/tools-and-equipment/dwv-mockup-teaching-0b1iiYmWhCM.jpg',
    summary: 'Building small-scale PVC drain-waste-vent mockups at home to pass plumbing fundamentals along.',
  },
  {
    id: 'JAU2ae9NY1g',
    title: 'Repairing a leak on a water supply line',
    category: 'Real Plumbing Projects',
    image: '/assets/images/the-fix-it-dad/plumbing-work/copper-water-line-leak-JAU2ae9NY1g.jpg',
    summary: 'Under-floor joist access cutting out damaged supply piping cleanly in tight crawlspace conditions.',
  },
  {
    id: 'W2avC2oN0_M',
    title: 'Finding an unconnected residential sewer line',
    category: 'Real Plumbing Projects',
    image: '/assets/images/the-fix-it-dad/plumbing-work/unconnected-sewer-line-W2avC2oN0_M.jpg',
    summary: 'Excavated trench inspection uncovering an open sewer transition before tying the building drain back together.',
  },
  {
    id: 'N4GH7PL4RDs',
    title: 'RIDGID K9-12 FlexShaft when standard snakes fall short',
    category: 'Tools & Products',
    image: '/assets/images/the-fix-it-dad/tools-and-equipment/ridgid-k9-12-flexshaft-N4GH7PL4RDs.jpg',
    summary: 'Using high-speed FlexShaft chain knocking to scrub buildup inside tile shower drain lines.',
  },
  {
    id: 'zzNEE0Jr8IA',
    title: 'Remember the 3 Ps next time you use the bathroom',
    category: 'Plumbing Journey',
    image: '/assets/images/the-fix-it-dad/videos-and-thumbnails/three-ps-bathroom-guide-zzNEE0Jr8IA.jpg',
    summary: 'Practical homeowner guidance straight from real Spartan drain-clearing service calls.',
  },
];

export const PHOTO_ARCHIVE: PhotoShowcaseItem[] = [
  {
    id: 'p1',
    title: 'Soldering Copper at the Tailgate',
    category: 'Real Plumbing Projects',
    image: '/assets/images/the-fix-it-dad/plumbing-work/press-or-solder-copper-wZaXh8ivRl4.jpg',
    caption: 'Pipe Vise, MAP-Pro torch, Oatey flux, and brass hose bib prep in the back of the truck.',
    youtubeId: 'wZaXh8ivRl4',
  },
  {
    id: 'p2',
    title: 'Cast Iron Stack Transition',
    category: 'Real Plumbing Projects',
    image: '/assets/images/the-fix-it-dad/plumbing-work/cast-iron-pipe-repair-eZiVLGdcUBA.jpg',
    caption: 'Seth working off a Multi-13 ladder tying new PVC drainage into historic framing.',
    youtubeId: 'eZiVLGdcUBA',
  },
  {
    id: 'p3',
    title: 'Closet Flange Concrete Anchoring',
    category: 'Real Plumbing Projects',
    image: '/assets/images/the-fix-it-dad/plumbing-work/installing-closet-flange-e5KyGfjj1E4.jpg',
    caption: 'Drilling mounting holes through a Charlotte 4"x3" PVC flange into a concrete slab.',
    youtubeId: 'e5KyGfjj1E4',
  },
  {
    id: 'p4',
    title: 'Shower Drain Replacement',
    category: 'Real Plumbing Projects',
    image: '/assets/images/the-fix-it-dad/plumbing-work/replacing-shower-drain-eGBOpGunnes.jpg',
    caption: 'Removing and prepping a residential shower drain assembly from underneath.',
    youtubeId: 'eGBOpGunnes',
  },
  {
    id: 'p5',
    title: 'Crawlspace Supply Line Cut',
    category: 'Real Plumbing Projects',
    image: '/assets/images/the-fix-it-dad/plumbing-work/copper-water-line-leak-JAU2ae9NY1g.jpg',
    caption: 'Precision tubing cut beneath floor joists during a residential leak repair.',
    youtubeId: 'JAU2ae9NY1g',
  },
  {
    id: 'p6',
    title: 'Sewer Trench Excavation',
    category: 'Real Plumbing Projects',
    image: '/assets/images/the-fix-it-dad/plumbing-work/unconnected-sewer-line-W2avC2oN0_M.jpg',
    caption: 'Uncovering a separated clay-to-PVC residential sewer line underground.',
    youtubeId: 'W2avC2oN0_M',
  },
  {
    id: 'p7',
    title: 'Milwaukee Packout Rig',
    category: 'Tools & Products',
    image: '/assets/images/the-fix-it-dad/tools-and-equipment/milwaukee-packout-van-tour-B0wlQMpXLOs.jpg',
    caption: 'Organized Packout drawer storage stocked with commercial Sloan flushometer kits.',
    youtubeId: 'B0wlQMpXLOs',
  },
  {
    id: 'p8',
    title: 'Service Van Tool Wall',
    category: 'Tools & Products',
    image: '/assets/images/the-fix-it-dad/plumbing-work/replacing-outside-faucet-X5rN7J594r8.jpg',
    caption: 'Hand drivers, wrenches, cutters, and brass fittings racked at the van doors.',
    youtubeId: 'X5rN7J594r8',
  },
  {
    id: 'p9',
    title: 'Spartan Drain Machine in Action',
    category: 'Tools & Products',
    image: '/assets/images/the-fix-it-dad/videos-and-thumbnails/three-ps-bathroom-guide-zzNEE0Jr8IA.jpg',
    caption: 'Running heavy cable through an open floor flange with protective gloves.',
    youtubeId: 'zzNEE0Jr8IA',
  },
  {
    id: 'p10',
    title: 'ShuBee Bee Armor Stair Protection',
    category: 'Brand Collaborations',
    image: '/assets/images/the-fix-it-dad/collaborations/shubee-bee-armor-stairs-4EXhS69xfb8.jpg',
    caption: 'Protecting customer hardwood and carpet stairs before bringing tools inside.',
    youtubeId: '4EXhS69xfb8',
  },
  {
    id: 'p11',
    title: 'ShuBee Hydro Shield Suit',
    category: 'Brand Collaborations',
    image: '/assets/images/the-fix-it-dad/collaborations/shubee-suit-showcase-UOcnLcLZ8GI.jpg',
    caption: 'Suited up beside the service van for dirty crawlspace and sewer calls.',
    youtubeId: 'UOcnLcLZ8GI',
  },
  {
    id: 'p12',
    title: 'Seth at ShuBee Headquarters',
    category: 'Owner Photography',
    image: '/assets/images/the-fix-it-dad/owner-photography/seth-at-shubee-hq-wgJwUktrHcI.jpg',
    caption: 'Wearing The Fix It Dad pocket tee while visiting ShuBee headquarters.',
    youtubeId: 'wgJwUktrHcI',
  },
];
