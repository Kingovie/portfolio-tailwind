export interface Screen {
  title: string;
  /** Absent until the export lands — the slot renders as a placeholder. */
  src?: string;
  /** Real pixel dimensions of the export — lets next/image generate a
   * correctly-sized responsive srcset instead of shipping the raw file. */
  width?: number;
  height?: number;
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
    screens: [{ title: 'Dashboard', src: p('dashboard-01.png'), width: 12420, height: 8928 }],
  },
  {
    id: 'crypto',
    title: 'Crypto',
    screens: [
      { title: 'Leverage trading', src: p('crypto-01.png'), width: 12420, height: 8928 },
      { title: 'P2P trade', src: p('crypto-02.png'), width: 12420, height: 8928 },
      { title: 'Convert', src: p('crypto-03.png'), width: 12420, height: 8928 },
      { title: 'Copy trading', src: p('crypto-04.png'), width: 12420, height: 10232 },
    ],
  },
  {
    id: 'stocks',
    title: 'Stocks',
    screens: [
      { title: 'Holdings & market', src: p('stocks-01.png'), width: 12420, height: 10232 },
      { title: 'Stock details & news', src: p('stocks-02.png'), width: 12420, height: 8928 },
    ],
  },
  {
    id: 'events',
    title: 'Event Betting',
    screens: [
      { title: 'Markets', src: p('events-01.png'), width: 12420, height: 9860 },
      { title: 'Bet history', src: p('events-02.png'), width: 12420, height: 8928 },
    ],
  },
  {
    id: 'banking-cards',
    title: 'Banking & Virtual Cards',
    screens: [
      { title: 'Accounts', src: p('banking-01.png'), width: 12420, height: 8928 },
      { title: 'Virtual card', src: p('banking-02.png'), width: 12420, height: 8928 },
      { title: 'Convert currencies', src: p('banking-03.png'), width: 12420, height: 8928 },
    ],
  },
];
