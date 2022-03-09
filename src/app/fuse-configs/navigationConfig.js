import { authRoles } from 'app/auth';
import i18next from 'i18next';
import DocumentationNavigation from '../main/documentation/DocumentationNavigation';

import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

const navigationConfig = [
  {
    id: 'pages',
    title: 'Sayfalar',
    type: 'group',
    icon: 'group',
    children: [
      {
        id: 'categories',
        title: 'Kategoriler',
        type: 'item',
        icon: 'category',
        url: 'pages/categories',
      },
      {
        id: 'sub-categories',
        title: 'Alt kategoriler',
        type: 'item',
        icon: 'category',
        url: 'pages/sub-categories',
      },
      {
        id: 'products',
        title: 'Ürünler',
        type: 'item',
        icon: 'restaurant-menu',
        url: 'pages/products',
      },
      {
        id: 'sliders',
        title: 'Slider',
        type: 'item',
        icon: 'image',
        url: 'pages/sliders',
      },
      {
        id: 'languages',
        title: 'Dil desteği',
        type: 'item',
        icon: 'language',
        url: 'pages/languages',
      },
      {
        id: 'tables',
        title: 'Masalar',
        type: 'item',
        icon: 'table',
        url: 'pages/tables',
      },
    ],
  },
  DocumentationNavigation,
];

export default navigationConfig;
