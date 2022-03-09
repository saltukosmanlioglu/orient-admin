import { lazy } from 'react';
import { authRoles } from 'app/auth';

const Categories = lazy(() => import('./Categories'));
const CreateCategory = lazy(() => import('./CreateCategory'));
const UpdateCategory = lazy(() => import('./UpdateCategory'));

const CategoryPageConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.admin,
  routes: [
    {
      path: 'pages/categories',
      element: <Categories />,
    },
    {
      path: 'pages/category/:id',
      element: <UpdateCategory />,
    },
    {
      path: 'pages/category/create',
      element: <CreateCategory />,
    },
  ],
};

export default CategoryPageConfig;
