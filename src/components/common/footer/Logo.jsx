import { useColorModeValue, Image } from '@chakra-ui/react';
import * as React from 'react';
import logo from '../../../assets/logo-agro.png';

export const Logo = (props) => {
  const themeLogo = useColorModeValue(true, false);

  return (
    <Image src={logo} h={{ lg: '15vh', md: '6vh', base: '35%' }} />
  );
};
