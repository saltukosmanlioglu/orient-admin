import { authRoles } from 'app/auth';
import { lazy } from 'react';

const CreateLanguage = lazy(() => import('./CreateLanguage'));
const Languages = lazy(() => import('./Languages'));
const UpdateLanguage = lazy(() => import('./UpdateLanguage'));

const LanguagePageConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.admin,
  routes: [
    {
      path: 'pages/languages',
      element: <Languages />,
    },
    {
      path: 'pages/language/:id',
      element: <UpdateLanguage />,
    },
    {
      path: 'pages/language/create',
      element: <CreateLanguage />,
    },
  ],
};

export default LanguagePageConfig;
