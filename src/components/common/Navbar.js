import React from 'react';

import {
  chakra,
  Box,
  Flex,
  useColorModeValue,
  HStack,
  Button,
  Image,
  useDisclosure,
  VStack,
  IconButton,
  CloseButton,
  InputGroup,
  InputLeftElement,
  Input,
  Divider,
  Link,
  Center,
} from '@chakra-ui/react';
import logo from '../../assets/logo-agro.png';
import logoDark from '../../assets/logo-only.png';
import {
  AiOutlineMenu,
  AiFillHome,
  AiFillInfoCircle,
  AiOutlineSearch,
  AiFillPhone,
} from 'react-icons/ai';
import { useHistory } from 'react-router-dom';
import ShoppingCartButton from './shoppingCart';
import { ColorModeSwitcher, ColorModeSwitcherMenuButton } from './../../ColorModeSwitcher';
import { Link as ReachLink } from 'react-router-dom';
export default function Navbar() {
  const bg = useColorModeValue('white', 'gray.800');
  const mobileNav = useDisclosure();
  const themeLogo = useColorModeValue(true, false);
  const navigate = useHistory();

  return (
    <React.Fragment>
      <chakra.header bg={bg} w="full" px={{ base: 2, sm: 4 }} py={4} shadow="md">
        <Flex
          alignItems="center"
          justifyContent="space-between"
          mx="auto"
          data-testid="printed-navbar">
          <HStack display="flex" spacing={3} alignItems="center">
            <Box display={{ base: 'inline-flex', md: 'none' }}>
              <IconButton
                display={{ base: 'flex', md: 'none' }}
                aria-label="Open menu"
                fontSize="20px"
                color={useColorModeValue('gray.800', 'inherit')}
                variant="ghost"
                icon={<AiOutlineMenu />}
                onClick={mobileNav.onOpen}
              />
              <VStack
                pos="absolute"
                top={0}
                left={0}
                right={0}
                display={mobileNav.isOpen ? 'flex' : 'none'}
                flexDirection="column"
                p={2}
                pb={4}
                m={2}
                bg={bg}
                spacing={3}
                rounded="sm"
                shadow="sm">
                <CloseButton
                  aria-label="Close menu"
                  justifySelf="self-start"
                  onClick={mobileNav.onClose}
                />
                <Button
                  w="full"
                  variant="ghost"
                  leftIcon={<AiFillHome />}
                  onClick={() => navigate.push('/')}>
                  Home
                </Button>
                <Button
                  w="full"
                  variant="ghost"
                  leftIcon={<AiFillInfoCircle />}
                  onClick={() => navigate.push('/about')}>
                  Acerca De
                </Button>
                <Button
                  w="full"
                  variant="ghost"
                  leftIcon={<AiFillPhone />}
                  onClick={() => navigate.push('/contacto')}>
                  Contacto
                </Button>
                <Divider />
                <ColorModeSwitcherMenuButton />
              </VStack>
            </Box>
            <Box onClick={() => navigate.push('/')} cursor="pointer" textAlign={'center'}>
              <Center>
                <Image
                  boxSize={{ lg: '10vh', md: '7vh', base: '20%' }}
                  display={{ base: 'block', md: 'none' }}
                  src={logoDark}
                />
              </Center>
              <Image
                h={{ lg: '8vh', md: '7vh', base: '25%' }}
                display={{ base: 'none', md: 'block' }}
                src={logo}
              />
            </Box>
            <HStack spacing={3} display={{ base: 'none', md: 'inline-flex' }}>
              <Link as={ReachLink} to="/" aria-label="HomeButton">
                <Button variant="ghost" leftIcon={<AiFillHome />} size="sm">
                  Home
                </Button>
              </Link>
              <Link as={ReachLink} to="/about">
                <Button variant="ghost" leftIcon={<AiFillInfoCircle />} size="sm">
                  Acerca De
                </Button>
              </Link>
              <Link as={ReachLink} to="/contacto">
                <Button variant="ghost" leftIcon={<AiFillPhone />} size="sm">
                  Contacto
                </Button>
              </Link>
            </HStack>
          </HStack>
          <HStack spacing={3} display={mobileNav.isOpen ? 'none' : 'flex'} alignItems="center">
            <Box display={{ base: 'none', md: 'inline-flex' }}>
              <ColorModeSwitcher />
            </Box>
            <ShoppingCartButton />
          </HStack>
        </Flex>
      </chakra.header>
    </React.Fragment>
  );
}
