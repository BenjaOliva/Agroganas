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

import { AddIcon } from '@chakra-ui/icons';
import { EditIcon } from '@chakra-ui/icons';
import {
  HomeIcon,
  StatsIcon,
  CartIcon,
  PersonIcon,
  RocketIcon,
  SupportIcon,
} from './components/Icons/Icons';
import { FaEye, FaInfoCircle, FaLink, FaTree } from 'react-icons/fa';
import { BsFileEarmarkText, BsFilePost, BsImages } from 'react-icons/bs';

var adminRoutes = [
  {
    path: '/dashboard',
    name: 'Panel de control',
    icon: <HomeIcon color="inherit" />,
    component: Dashboard,
    layout: '/admin',
  },
  {
    name: 'Publicaciones',
    category: 'section',
    state: 'pageCollapse',
    path: '/posts',
    layout: '/admin',
    icon: <BsFilePost color="inherit" />,
    views: [
      {
        path: '/all-posts',
        name: 'Publicaciones',
        icon: <FaEye color="inherit" />,
        component: Tables,
        layout: '/admin',
      },
      {
        path: '/add',
        name: 'Agregar publicación',
        icon: <AddIcon color="inherit" />,
        secondaryNavbar: true,
        component: Profile,
        layout: '/admin',
      },
      {
        path: '/edit',
        name: 'Editar publicación',
        icon: <EditIcon color="inherit" />,
        secondaryNavbar: true,
        component: Theming,
        layout: '/admin',
      },
    ],
  },
  {
    name: 'Clientes',
    category: 'section',
    state: 'pageCollapse',
    path: '/clients',
    layout: '/admin',
    icon: <FaTree color="inherit" />,
    views: [
      {
        path: '/view',
        name: 'Agronomías',
        icon: <FaEye color="inherit" />,
        secondaryNavbar: true,
        component: Profile,
        layout: '/admin',
      },
      {
        path: '/add',
        name: 'Agregar Agronomía',
        icon: <AddIcon color="inherit" />,
        secondaryNavbar: true,
        component: Profile,
        layout: '/admin',
      },
      {
        path: '/edit',
        name: 'Editar Agronomía',
        icon: <EditIcon color="inherit" />,
        secondaryNavbar: true,
        component: Theming,
        layout: '/admin',
      },
    ],
  },
  {
    path: '/web',
    name: 'Sitio Web',
    icon: <FaLink color="inherit" />,
    component: Billing,
    layout: '/admin',
  },
  {
    name: 'Documentación',
    category: 'account',
    state: 'pageCollapse',
    views: [
      {
        path: '/terms',
        name: 'Terminos y Condiciones',
        icon: <FaInfoCircle color="inherit" />,
        secondaryNavbar: true,
        component: Profile,
        layout: '/admin',
      },
      {
        path: '/guides',
        name: 'Guias de uso',
        icon: <BsFileEarmarkText color="inherit" />,
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
];

export default adminRoutes;
