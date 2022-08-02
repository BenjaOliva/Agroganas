/*eslint-disable*/
import React from 'react';
import { Flex, Link, List, ListItem, Text, Box } from '@chakra-ui/react';
import { ColorModeSwitcher } from './../../ColorModeSwitcher';

export default function Footer(props) {
  // const linkTeal = useColorModeValue("teal.400", "red.200");=
  return (
    <Flex
      flexDirection={{
        base: 'column',
        xl: 'row',
      }}
      alignItems={{
        base: 'center',
        xl: 'start',
      }}
      justifyContent="space-between"
      pb="5px"
    >
      <ColorModeSwitcher />
      <Text
        color="gray.400"
        textAlign={{
          base: 'center',
          xl: 'start',
        }}
        mb={{ base: '20px', xl: '0px' }}
        mt={{ base: '10px', xl: '15px' }}
      >
        &copy; {1900 + new Date().getYear()},{' '}
        <Text as="span">Agroganás. All rights reserved.</Text>
      </Text>
      <List display="flex" mt={{ base: '0px', xl: '15px' }}>
        <ListItem
          me={{
            base: '20px',
            md: '44px',
          }}
        >
          <Link color="gray.400">Ir al sitio</Link>
        </ListItem>
        <ListItem
          me={{
            base: '20px',
            md: '44px',
          }}
        >
          <Link color="gray.400" href="">
            Contacto
          </Link>
        </ListItem>
      </List>
    </Flex>
  );
}
