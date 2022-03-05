import { lazy } from 'react';

const CreateSubCategory = lazy(() => import('./CreateSubCategory'));
const SubCategories = lazy(() => import('./SubCategories'));
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
      element: <SubCategories />,
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
