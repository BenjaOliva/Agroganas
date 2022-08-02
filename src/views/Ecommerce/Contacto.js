import { Box, Button, Heading, Text } from '@chakra-ui/react';
import * as React from 'react';

const Contacto = () => (
  <Box as="section">
    <Box
      maxW="2xl"
      mx="auto"
      px={{
        base: '6',
        lg: '8',
      }}
      py={{
        base: '16',
        sm: '20',
      }}
      textAlign="center">
      <Heading size="3xl" fontWeight="extrabold" letterSpacing="tight">
        Necesitas comunicarte?
      </Heading>
      <Text mt="4" fontSize="lg">
        Nuestros centros de atención estan disponibles de Lunes a Viernes.
      </Text>
      <Button mt="8" as="a" href="#" size="lg" colorScheme="blue" fontWeight="bold">
        Contactar
      </Button>
    </Box>
  </Box>
);

export default Contacto;
