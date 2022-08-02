// import
import Dashboard from './views/Dashboard/Dashboard.js';
import Tables from './views/Dashboard/Tables.js';
import Billing from './views/Dashboard/Billing.js';
import Profile from './views/Dashboard/Profile.js';
import Theming from './views/Dashboard/SystemTheming';
import Contacto from './views/Ecommerce/Contacto';
import About from './views/Ecommerce/About';
import Home from './views/Ecommerce/Home';
import SignIn from './views/Pages/SignIn';
import Sales from './views/Dashboard/Sales';

import {
  HomeIcon,
  StatsIcon,
  CartIcon,
  PersonIcon,
  RocketIcon,
  SupportIcon,
} from './components/Icons/Icons';

var adminRoutes = [
  {
    path: '/dashboard',
    name: 'Panel de control',
    icon: <HomeIcon color="inherit" />,
    component: Dashboard,
    layout: '/admin',
  },
  {
    path: '/posts',
    name: 'Publicaciones',
    icon: <CartIcon color="inherit" />,
    component: Tables,
    layout: '/admin',
  },
  {
    path: '/stats',
    name: 'Estadisticas',
    icon: <StatsIcon color="inherit" />,
    component: Billing,
    layout: '/admin',
  },
  {
    path: '/clients',
    name: 'Clientes',
    icon: <RocketIcon color="inherit" />,
    component: Sales,
    layout: '/admin',
  },
  {
    name: 'Configuraciones',
    category: 'account',
    state: 'pageCollapse',
    views: [
      {
        path: '/profile',
        name: 'Perfil',
        icon: <PersonIcon color="inherit" />,
        secondaryNavbar: true,
        component: Profile,
        layout: '/admin',
      },
      {
        path: '/config',
        name: 'Personalización',
        icon: <SupportIcon color="inherit" />,
        secondaryNavbar: true,
        component: Theming,
        layout: '/admin',
      },
    ],
  },
];

export var ecommerceRoutes = [
  {
    path: '/contacto',
    name: 'Contacto',
    component: Contacto,
    layout: '/',
  },
  {
    path: '/about',
    name: 'Acerca De',
    component: About,
    layout: '/',
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    layout: '/',
  },
];

export var authRoutes = [
  {
    path: '/signin',
    name: 'Sign In',
    component: SignIn,
    layout: '/auth',
  },
]

export default adminRoutes;
