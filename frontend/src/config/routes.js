
import Dashboard from '../components/dashboard';
import Advertisers from '../components/advertisers';
import Campaigns from '../components/campaigns';
// list of working routes for frontend app
export const routes = [
  {
    path: '/',
    exact: true,
    component: Dashboard,
  },
  {
    path: '/advertisers',
    exact: true,
    component: Advertisers,
  },
  {
    path: '/campaigns',
    exact: true,
    component: Campaigns,
  },
];
