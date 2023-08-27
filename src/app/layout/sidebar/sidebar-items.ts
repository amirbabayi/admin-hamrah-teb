import {RouteInfo} from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
  {
    path: 'apps/duties',
    title: 'مدیریت خدمات',
    iconType: '',
    icon: 'assets/icons/dashboard-icon.svg',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    submenu: [],
    roles: 'Admin'
  },
  {
    path: 'apps/blogs',
    title: 'مدیریت مقالات',
    iconType: '',
    icon: 'assets/icons/customer-icon.svg',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    submenu: [],
    roles: 'Admin'
  }
];
