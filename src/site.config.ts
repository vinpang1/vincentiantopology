export type NavItem = {
  href: string;
  labelZh: string;
  labelEn: string;
};

export const siteConfig = {
  nameZh: '萬脈同構｜文森思維',
  nameEn: 'All Things Are One | Vincentian Topology',
  taglineZh: '探索文森世界觀的閱讀空間',
  taglineEn: 'A reading space for Vincentian topology',
  url: 'https://vincentiantopology.com',
  subscribeUrl: '#subscribe',
  navItems: [
    { href: '/intro', labelZh: '關於我們', labelEn: 'About' },
    { href: '/view', labelZh: '文森世界', labelEn: 'Vincentian World' },
    { href: '/topics', labelZh: '專題探討', labelEn: 'Topics' },
    { href: '/classics', labelZh: '經典註解', labelEn: 'Classics' },
  ] satisfies NavItem[],
} as const;
