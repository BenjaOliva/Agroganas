import React, { useState, useEffect } from 'react';
import capsFirst from './../../components/Carousel/utils/capsFirst';
import {
  Container,
  Heading,
  Button,
  VStack,
  HStack,
  Text,
  Flex,
  Tag,
  useToast,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import ChakraCarousel from './../../components/Carousel/Carousel';

const Home = () => {
  const [data, setData] = useState([]);
  const toast = useToast();
  const visitCount = useSelector((state) => state.visit_counter);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts/')
      .then((res) => res.json())
      .then((res) => setData(res));
    switch (visitCount) {
      case 2:
        toast({
          title: 'Que bueno verte de nuevo!',
          description: 'Toca aqui para ver las ofertas.',
          status: 'info',
          duration: 3000,
          variant: 'left-accent',
          isClosable: true,
        });
        break;
      case 3:
        toast({
          title: 'Estamos atentos a tus necesidades',
          description: "Dirigete a la sección 'Contacto' para recibir ayuda",
          status: 'warning',
          duration: 4000,
          variant: 'left-accent',
          isClosable: true,
        });
        break;
      default:
        break;
    }
  }, []);

  return (
    <Container my={8} minWidth={'100%'}>
      <ChakraCarousel gap={10}>
        {data.slice(5, 15).map((post, index) => (
          <Flex
            key={index}
            boxShadow="rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px"
            justifyContent="space-between"
            flexDirection="column"
            overflow="hidden"
            bg="base.d100"
            rounded={5}
            flex={1}
            p={5}
            my={5}>
            <VStack mb={6}>
              <Heading fontSize={{ base: 'xl', md: '2xl' }} textAlign="left" w="full" mb={2}>
                {capsFirst(post.title)}
              </Heading>
              <Text w="full">{capsFirst(post.body)}</Text>
            </VStack>

            <Flex justifyContent="space-between">
              <HStack spacing={2}>
                <Tag size="sm" variant="outline" colorScheme="green">
                  User: {post.userId}
                </Tag>
                <Tag size="sm" variant="outline" colorScheme="cyan">
                  Post: {post.id - 5}
                </Tag>
              </HStack>
              <Button
                onClick={() => alert(`Post ${post.id - 5} clicked`)}
                colorScheme="green"
                fontWeight="bold"
                color="gray.900"
                size="sm">
                Ver Promoción
              </Button>
            </Flex>
          </Flex>
        ))}
      </ChakraCarousel>
    </Container>
  );
};

export default Home;
