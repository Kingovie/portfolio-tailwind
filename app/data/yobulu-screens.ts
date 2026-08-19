export interface Screen {
  title: string;
  /** Absent until the export lands — the slot renders as a placeholder. */
  src?: string;
}

export interface ScreenGroup {
  id: string;
  /** Sub-header shown above this group's placeholders. */
  title: string;
  screens: Screen[];
}

const p = (file: string) => `/projects/yobulu-screens/${file}`;

export const groups: ScreenGroup[] = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    screens: [{ title: 'Dashboard', src: p('dashboard-01.png') }],
  },
  {
    id: 'crypto',
    title: 'Crypto',
    screens: [
      { title: 'Leverage trading', src: p('crypto-01.png') },
      { title: 'P2P trade', src: p('crypto-02.png') },
      { title: 'Convert', src: p('crypto-03.png') },
      { title: 'Copy trading', src: p('crypto-04.png') },
    ],
  },
  {
    id: 'stocks',
    title: 'Stocks',
    screens: [
      { title: 'Holdings & market', src: p('stocks-01.png') },
      { title: 'Stock details & news', src: p('stocks-02.png') },
    ],
  },
  {
    id: 'events',
    title: 'Event Betting',
    screens: [
      { title: 'Markets', src: p('events-01.png') },
      { title: 'Bet history', src: p('events-02.png') },
    ],
  },
  {
    id: 'banking-cards',
    title: 'Banking & Virtual Cards',
    screens: [
      { title: 'Accounts', src: p('banking-01.png') },
      { title: 'Virtual card', src: p('banking-02.png') },
      { title: 'Convert currencies', src: p('banking-03.png') },
    ],
  },
];
