export const site = {
  name: '萬脈同構｜文森思維',
  nameEn: 'All Things Are One | Vincentian Topology',
  tagline:
    '閱讀不是為了判斷對錯；而是為了看見：思維在兩極之間的拉扯',
  description:
    '給當代迷惘讀者的閱讀空間——看見思維在兩極之間如何拉扯，而非急於判對錯。',
  url: 'https://vincentiantopology.com',
  subscribeUrl: 'https://vincentiantopology.substack.com',
  subscribeLabel: '訂閱',
  logo: '/logo.png',
  logoAlt: 'Vincentian Topology · 萬脈同構｜文森思維',
} as const;

export type NavItem = {
  href: string;
  labelZh: string;
  labelEn: string;
};

export const navItems: NavItem[] = [
  { href: '/intro', labelZh: '關於我們', labelEn: 'About Us' },
  { href: '/view', labelZh: '文森世界', labelEn: 'Vincentian View' },
  { href: '/topics', labelZh: '專題探討', labelEn: 'Special Topics' },
  { href: '/classics', labelZh: '經典註解', labelEn: 'Classic Commentary' },
];

export const sections = {
  intro: {
    slug: 'intro',
    labelZh: '關於我們',
    labelEn: 'About Us',
    href: '/intro',
  },
  view: {
    slug: 'view',
    labelZh: '文森世界',
    labelEn: 'Vincentian View',
    href: '/view',
  },
  topics: {
    slug: 'topics',
    labelZh: '專題探討',
    labelEn: 'Special Topics',
    href: '/topics',
  },
  classics: {
    slug: 'classics',
    labelZh: '經典註解',
    labelEn: 'Classic Commentary',
    href: '/classics',
  },
} as const;
