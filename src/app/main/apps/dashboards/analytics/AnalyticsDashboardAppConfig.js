import { lazy } from 'react';
import { authRoles } from 'app/auth';

const AnalyticsDashboardApp = lazy(() => import('./AnalyticsDashboardApp'));

const AnalyticsDashboardAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.admin,
  routes: [
    {
      path: 'apps/dashboards/analytics',
      element: <AnalyticsDashboardApp />,
    },
  ],
};

export default AnalyticsDashboardAppConfig;
