import { Box, Link, SimpleGrid, Stack } from '@chakra-ui/react';
import * as React from 'react';
import { FooterHeading } from './FooterHeading';

export const LinkGrid = (props) => (
  <SimpleGrid columns={2} {...props}>
    <Box minW="130px">
      <FooterHeading mb="4">Empresa</FooterHeading>
      <Stack>
        <Link>Contacto</Link>
        <Link>Acerca De</Link>
      </Stack>
    </Box>
    <Box minW="130px">
      <FooterHeading mb="4">Tienda</FooterHeading>
      <Stack>
        <Link>Home</Link>
        <Link>Categorias</Link>
        <Link>Carrito</Link>
      </Stack>
    </Box>
  </SimpleGrid>
);
