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

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, loading] = useAuthState(auth);
  const history = useHistory();
  const toast = useToast();
  const [Error, setError] = useState(false);
  const logInWithEmailAndPassword = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setError(false);
    } catch {
      setError(true);
    }
  };

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) history.push('/admin');
  }, [user, loading]);

  useEffect(() => {
    if (!!Error) {
      toast({
        title: 'Usuario Invalido!',
        description: 'Las credenciales no coinciden con un usuario Administrador',
        status: 'error',
        position: 'top',
        duration: 3000,
        isClosable: true,
      });
    }
  }, [Error]);

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
