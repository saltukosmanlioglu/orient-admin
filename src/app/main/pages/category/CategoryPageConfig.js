import { lazy } from 'react';

const Category = lazy(() => import('./Category'));
const CreateCategory = lazy(() => import('./CreateCategory'));
const UpdateCategory = lazy(() => import('./UpdateCategory'));

const CategoryPageConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'pages/categories',
      element: <Category />,
    },
    {
      path: 'pages/categories/:id',
      element: <UpdateCategory />,
    },
    {
      path: 'pages/categories/create',
      element: <CreateCategory />,
    },
  ],
};

export default CategoryPageConfig;
