import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'General Information',
    icon: 'hash-outline',
    link: '/pages/general',
    home: true,
  },
  {
    title: 'Emotion/Sentiment Analysis',
    icon: { icon: 'chart-line', pack: 'fa' },
    link: '/pages/emotion',
  },
  {
    title: 'User Profiling',
    icon: 'people-outline',
    link: '/pages/user-profiling',
  },
  {
    title: 'GIS Map',
    icon: 'map-outline',
    link: '/pages/gis',
  },
];
