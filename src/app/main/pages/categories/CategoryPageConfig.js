import { lazy } from 'react';

const CategoryDetailPage = lazy(() => import('./CategoryDetailPage'));
const CategoryPage = lazy(() => import('./CategoryPage'));
const CreateCategoryPage = lazy(() => import('./CreateCategoryPage'));

const CategoryPageConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'pages/categories',
      element: <CategoryPage />,
    },
    {
      path: 'pages/categories/:id',
      element: <CategoryDetailPage />,
    },
    {
      path: 'pages/categories/create',
      element: <CreateCategoryPage />,
    },
  ],
};

export default CategoryPageConfig;
