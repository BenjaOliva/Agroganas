import React, { useState, useEffect } from 'react';
// Chakra imports
import {
  Box,
  Flex,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
// Assets
import signInImage from '../../assets/img/signInImage.png';
import { auth, signInWithEmailAndPassword } from '../../services/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const logInWithEmailAndPassword = async (email, password) => {
    try {
      setLoading(true);
      await login(email, password).then(() => {
        history.push('/admin');
      });
    } catch (error) {
      console.error('error: ', error.code);
      var message;
      switch (error.code) {
        case 'auth/user-not-found':
          message = 'Usuario no encontrado';
          break;
        case 'auth/wrong-password':
          message = 'Contraseña incorrecta';
          break;
        case 'auth/invalid-email':
          message = 'Email incorrecto';
          break;
        default:
          message = 'Error inesperado';
          break;
      }
      toast({
        title: 'Error',
        description: message,
        status: 'error',
        duration: 2000,
        position: 'top',
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const titleColor = useColorModeValue('green.600', 'green.500');
  const textColor = useColorModeValue('gray.400', 'white');
  return (
    <Flex position="relative">
      <Flex
        h={{ sm: 'initial', md: '75vh', lg: '85vh' }}
        w="100%"
        maxW="1044px"
        mx="auto"
        justifyContent="space-between"
        mb="30px"
        pt={{ sm: '100px', md: '0px' }}>
        <Flex
          alignItems="center"
          justifyContent="start"
          style={{ userSelect: 'none' }}
          w={{ base: '100%', md: '50%', lg: '42%' }}>
          <Flex
            direction="column"
            w="100%"
            background="transparent"
            p="40px"
            mt={{ md: '150px', lg: '30px' }}>
            <Heading color={titleColor} fontSize="32px" mb="10px">
              Bienvenido
            </Heading>
            <Text mb="30px" ms="4px" color={textColor} fontWeight="bold" fontSize="16px">
              Ingrese sus credenciales de administrador
            </Text>
            <FormControl>
              <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                Email
              </FormLabel>
              <Input
                borderRadius="15px"
                mb="24px"
                fontSize="sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                placeholder="Email..."
                size="lg"
              />
              <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                Contraseña
              </FormLabel>
              <Input
                borderRadius="15px"
                mb="36px"
                fontSize="sm"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña..."
                size="lg"
              />
              <Button
                isLoading={loading}
                type="submit"
                bg="green.600"
                w="100%"
                h="45"
                mb="15px"
                color="white"
                onClick={() => logInWithEmailAndPassword(email, password)}
                _hover={{
                  bg: 'green.400',
                }}
                _active={{
                  bg: 'green.800',
                }}>
                Ingresar
              </Button>
            </FormControl>
          </Flex>
        </Flex>
        <Box
          display={{ base: 'none', md: 'block' }}
          overflowX="hidden"
          h="95%"
          w="40vw"
          position="absolute"
          right="0px">
          <Box
            bgImage={signInImage}
            w="100%"
            h="100%"
            bgSize="cover"
            bgPosition="50%"
            position="absolute"
            borderBottomLeftRadius="20px"></Box>
        </Box>
      </Flex>
    </Flex>
  );
}

export default SignIn;
