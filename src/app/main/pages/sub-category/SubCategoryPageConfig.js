import { lazy } from 'react';

const SubCategory = lazy(() => import('./SubCategory'));
const CreateSubCategory = lazy(() => import('./CreateSubCategory'));
const UpdateSubCategory = lazy(() => import('./UpdateSubCategory'));

const SubCategoryPageConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'pages/sub-categories',
      element: <SubCategory />,
    },
    {
      path: 'pages/sub-category/:id',
      element: <UpdateSubCategory />,
    },
    {
      path: 'pages/sub-category/create',
      element: <CreateSubCategory />,
    },
  ],
};

export default SubCategoryPageConfig;
