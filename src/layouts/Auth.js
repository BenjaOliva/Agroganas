// chakra imports
import { Box, ChakraProvider } from '@chakra-ui/react';
import Footer from '../components/Footer/Footer.js';
// core components
import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import theme from '../theme/theme.js';
import { connect } from 'react-redux';

function Auth(props) {
  // ref for the wrapper div
  useEffect(() => {
    document.body.style.overflow = 'unset';
    return function cleanup() {};
  });

  const navRef = React.useRef();
  document.documentElement.dir = 'ltr';
  return (
    <ChakraProvider theme={theme} resetCss={false} w="100%">
      <Box ref={navRef} w="100%">
        <Box w="100%">
          <Outlet />
        </Box>
        <Box px="24px" mx="auto" width="1044px" maxW="100%">
          <Footer />
        </Box>
      </Box>
    </ChakraProvider>
  );
}

export default connect()(Auth);
