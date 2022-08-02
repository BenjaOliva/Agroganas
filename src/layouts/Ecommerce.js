// Chakra imports
import { Box, chakra, ChakraProvider } from '@chakra-ui/react';
// Layout components
import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { ecommerceRoutes as routes } from '../routes.js';
import Navbar from './../components/common/Navbar';
import { Footer } from './../components/common/footer/Footer';
import theme from '../theme/theme.js';
import { useDispatch, useSelector } from 'react-redux';
import LoadingPage from './../components/extra/Loading/LoadingScreen';
import ReactGA from 'react-ga';

export default function EcommerceLayout() {
  const loading = useSelector((state) => state.loadingProducts);
  ReactGA.initialize('UA-218125664-1');

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === '/') {
        return <Route path={prop.path} component={prop.component} key={key} />;
      } else {
        return null;
      }
    });
  };

  return (
    <ChakraProvider theme={theme} resetCss={false}>
      {loading ? (
        <LoadingPage />
      ) : (
        <>
          <Box top="0" zIndex={'999'} position="sticky">
            <Navbar />
          </Box>
          <Box>
            <Switch>{getRoutes(routes)}</Switch>
          </Box>
          <chakra.footer>
            <Footer />
          </chakra.footer>
        </>
      )}
    </ChakraProvider>
  );
}
