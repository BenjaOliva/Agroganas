// Chakra imports
import { ChakraProvider, Portal, useDisclosure, useToast } from '@chakra-ui/react';
import Configurator from '../components/Configurator/Configurator';
import Footer from '../components/Footer/Footer.js';
// Layout components
import AdminNavbar from '../components/Navbars/AdminNavbar.js';
import Sidebar from '../components/Sidebar/Sidebar.js';
import React, { useState, useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import routes from '../routes.js';
// Custom Chakra theme
import theme from '../theme/theme.js';
import FixedPlugin from '../components/FixedPlugin/FixedPlugin';
// Custom components
import MainPanel from '../components/Layout/MainPanel';
import PanelContainer from '../components/Layout/PanelContainer';
import PanelContent from '../components/Layout/PanelContent';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../services/firebase';
import { useHistory } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';
import LoadingPage from './../components/extra/Loading/LoadingScreen';

function Dashboard(props) {
  const history = useHistory();
  const toast = useToast();
  const [user, loading] = useAuthState(auth);
  useEffect(() => {
    if (loading) return;
    if (!user) {
      return history.push('/auth/signin');
    } else {
      toast({
        title: 'Sesion Iniciada',
        description: 'Bienvenido al administrador de Agroganas.',
        status: 'success',
        duration: 2000,
        position: 'top',
        isClosable: true,
      });
    }
  }, [user, loading]);

  const { ...rest } = props;
  // states and functions
  const [sidebarVariant, setSidebarVariant] = useState('transparent');
  const [fixed, setFixed] = useState(false);
  // ref for main panel div
  const mainPanel = React.createRef();
  // functions for changing the states from components
  const getRoute = () => {
    return window.location.pathname !== '/admin/full-screen-maps';
  };
  const getActiveRoute = (routes) => {
    let activeRoute = 'Default Brand Text';
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        let collapseActiveRoute = getActiveRoute(routes[i].views);
        if (collapseActiveRoute !== activeRoute) {
          return collapseActiveRoute;
        }
      }
      if ('/' + window.location.pathname.split('/')[2] === routes[i].path) {
        return routes[i].name;
      } else if (routes[i].category) {
        let categoryActiveRoute = getActiveRoute(routes[i].views);
        if (categoryActiveRoute !== activeRoute) {
          return categoryActiveRoute;
        }
      } else {
        if (window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1) {
          return routes[i].name;
        }
      }
    }
    return activeRoute;
  };
  // This changes navbar state(fixed or not)
  const getActiveNavbar = (routes) => {
    let activeNavbar = false;
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].category) {
        let categoryActiveNavbar = getActiveNavbar(routes[i].views);
        if (categoryActiveNavbar !== activeNavbar) {
          return categoryActiveNavbar;
        }
      } else {
        if (window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1) {
          if (routes[i].secondaryNavbar) {
            return routes[i].secondaryNavbar;
          }
        }
      }
    }
    return activeNavbar;
  };
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return getRoutes(prop.views);
      }
      if (prop.category === 'account') {
        return getRoutes(prop.views);
      }
      if (prop.category === 'section') {
        return prop.views.map((item, key) => {
          return (
            <Route
              path={item.layout + prop.path + item.path}
              component={item.component}
              key={key}
            />
          );
        });
      }
      if (prop.layout === '/admin') {
        return <Route path={prop.layout + prop.path} component={prop.component} key={key} />;
      } else {
        return null;
      }
    });
  };
  const { isOpen, onOpen, onClose } = useDisclosure();
  document.documentElement.dir = 'ltr';
  // Chakra Color Mode
  return props.loadingData ? (
    <LoadingPage />
  ) : (
    <>
      {user && (
        <>
          <Sidebar
            routes={routes}
            logoText={'Agroganás - Admin'}
            display="none"
            sidebarVariant={sidebarVariant}
            {...rest}
          />
          <MainPanel
            ref={mainPanel}
            w={{
              base: '100%',
              xl: 'calc(100% - 275px)',
            }}>
            <Portal>
              <AdminNavbar
                onOpen={onOpen}
                logoText={'Agroganas - Admin'}
                brandText={getActiveRoute(routes)}
                secondary={getActiveNavbar(routes)}
                fixed={fixed}
                {...rest}
              />
            </Portal>
            {getRoute() ? (
              <PanelContent>
                <PanelContainer>
                  <Switch>
                    {getRoutes(routes)}
                    <Redirect from="/admin" to="/admin/dashboard" />
                  </Switch>
                </PanelContainer>
              </PanelContent>
            ) : null}
            <Footer />
            <Portal>
              <FixedPlugin secondary={getActiveNavbar(routes)} fixed={fixed} onOpen={onOpen} />
            </Portal>
            <Configurator
              secondary={getActiveNavbar(routes)}
              isOpen={isOpen}
              onClose={onClose}
              isChecked={fixed}
              onSwitch={(value) => {
                setFixed(value);
              }}
              onOpaque={() => setSidebarVariant('opaque')}
              onTransparent={() => setSidebarVariant('transparent')}
            />
          </MainPanel>
        </>
      )}
    </>
  );
}

function Admin(props) {
  return (
    <ChakraProvider theme={theme} resetCss={false}>
      <Dashboard loadingData={props.loadingProducts} />
    </ChakraProvider>
  );
}

export default connect(({ loadingProducts }) => ({ loadingProducts }))(Admin);
