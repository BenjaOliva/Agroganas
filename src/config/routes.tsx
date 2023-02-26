import { Center, Spinner } from '@chakra-ui/react';
import EcommerceLayout from '../layouts/Ecommerce';
import AdminLayout from '../layouts/Admin';
import AuthLayout from '../layouts/Auth';
import Contacto from '../views/Ecommerce/Contacto';
import About from '../views/Ecommerce/About';
import Home from '../views/Ecommerce/Home';
import SignIn from '../views/Pages/SignIn';
import Dashboard from '../views/Dashboard/Dashboard';
import Profile from '../views/Dashboard/Profile';
import Theming from '../views/Dashboard/SystemTheming';
import Billing from '../views/Dashboard/Billing';
import { Navigate } from 'react-router';
import PrivateRoute from '../components/PrivateRoute';

const Loader = () => (
  <Center w="100%" h="100vh">
    <Spinner m="auto" />
  </Center>
);

export const routes = [
  {
    path: '/admin',
    element: <PrivateRoute component={AdminLayout} />,
    loader: Loader,
    children: [
      {
        path: '*',
        name: 'Panel de control',
        element: <Dashboard />,
      },
      {
        name: 'Publicaciones',
        path: 'posts',
        children: [
          {
            path: 'all-posts',
            name: 'Publicaciones',
            element: <div />,
          },
          {
            path: 'add',
            name: 'Agregar publicación',
            element: <Profile />,
          },
          {
            path: 'edit',
            name: 'Editar publicación',
            element: <Theming />,
          },
        ],
      },
      {
        name: 'Clientes',
        path: 'clients',
        children: [
          {
            path: 'view',
            name: 'Agronomías',
            element: <Profile />,
          },
          {
            path: 'add',
            name: 'Agregar Agronomía',
            element: <Profile />,
          },
          {
            path: 'edit',
            name: 'Editar Agronomía',
            element: <Theming />,
          },
        ],
      },
      {
        path: 'web',
        name: 'Sitio Web',
        element: <Billing />,
      },
      {
        path: 'terms',
        name: 'Terminos y Condiciones',
        element: <Profile />,
      },
      {
        path: 'guides',
        name: 'Guias de uso',
        element: <Theming />,
      },
      {
        // Fallback route
        path: '*',
        element: <Navigate to={'/admin/dashboard'} />,
      },
      {
        // Default sub path route
        index: true,
        element: <Navigate to={'/admin/dashboard'} />,
      },
    ],
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    loader: Loader,
    children: [
      {
        index: true,
        name: 'Sign In',
        element: <SignIn />,
      },
      {
        // Fallback route
        path: '*',
        element: <Navigate to={'/auth'} />,
      },
    ],
  },
  {
    path: '/',
    loader: Loader,
    element: <EcommerceLayout />,
    children: [
      {
        index: true,
        name: 'Home',
        element: <Home />,
      },
      {
        path: 'contacto',
        name: 'Contacto',
        element: <Contacto />,
      },
      {
        path: '/about',
        name: 'Acerca De',
        element: <About />,
      },
    ],
  },
];
