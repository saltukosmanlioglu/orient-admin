import { authRoles } from 'app/auth';
import { lazy } from 'react';

const CreateTable = lazy(() => import('./CreateTable'));
const Tables = lazy(() => import('./Tables'));
const UpdateTable = lazy(() => import('./UpdateTable'));

const TablePageConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.admin,
  routes: [
    {
      path: 'pages/tables',
      element: <Tables />,
    },
    {
      path: 'pages/table/:id',
      element: <UpdateTable />,
    },
    {
      path: 'pages/table/create',
      element: <CreateTable />,
    },
  ],
};

export default TablePageConfig;
