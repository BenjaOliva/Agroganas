import {
  Box,
  BoxProps,
  Flex,
  Icon,
  IconButton,
  Stack,
  StackProps,
  Text,
  chakra,
  Image,
  Skeleton,
  Tag,
  Button,
  useToast,
  List,
  ListItem,
  ListIcon,
  SimpleGrid,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
} from '@chakra-ui/react';
import React from 'react';
import {
  FaClipboardCheck,
  FaExclamation,
  FaHeart,
  FaMapMarkerAlt,
  FaMarker,
  FaPhone,
  FaShareAlt,
} from 'react-icons/fa';
import { PostDTO } from '../../utils/interfaces';
import { Swiper, SwiperSlide } from 'swiper/react';

// Styles must use direct files imports
import 'swiper/swiper.scss'; // core Swiper
import 'swiper/modules/navigation/navigation.scss'; // Navigation module
import 'swiper/modules/pagination/pagination.scss'; // Pagination module
import 'swiper/modules/effect-cards/effect-cards.scss'; // Effect Cards module

import './styles.css';

import { EffectCards } from 'swiper';
import { IoMdCheckmarkCircle } from 'react-icons/io';

interface PostViewProps {
  styles: StackProps;
  postData: PostDTO;
}

const PostView: React.FC<PostViewProps> = ({ styles, postData }) => {
  console.log('Data: ', postData);
  const toast = useToast();

  const [imageLoaded, setImageLoaded] = React.useState(false);
  return (
    <Stack
      spacing={{ base: 5, md: '10%' }}
      direction={{ base: 'column', md: 'row' }}
      rounded="md"
      w={'100%'}
      overflow="hidden"
      pos="relative">
      {postData.Oferta && (
        <Flex
          alignItems="center"
          p={1}
          bg="red.600"
          pos="absolute"
          fontSize="xs"
          fontWeight="500"
          color="white"
          top={0}
          left={0}
          rounded="md"
          zIndex={999}>
          <Text>OFERTA</Text> &nbsp; <Icon as={FaExclamation} h={4} w={4} />
        </Flex>
      )}
      <Flex ml="4% !important">
        <Skeleton isLoaded={imageLoaded} fadeDuration={2} h={'100%'} marginY={{ sm: '3%' }}>
          <Swiper
            spaceBetween={10}
            slidesPerView={1}
            pagination={{ clickable: true }}
            navigation={{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }}
            modules={[EffectCards]}
            effect="cards"
            onImagesReady={() => setImageLoaded(true)}>
            {postData?.Imagen.map((image, index) => (
              <SwiperSlide key={'image-' + index}>
                <Image
                  rounded="md"
                  w={{ base: '100%', md: '30rem' }}
                  h="auto"
                  objectFit="cover"
                  src={image}
                  alt="product image"
                  _hover={{ cursor: 'grab' }}
                  onLoad={() =>
                    setTimeout(() => {
                      setImageLoaded(true);
                    }, 2000)
                  }
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </Skeleton>
      </Flex>
      <Stack direction="column" spacing={2} mt={{ base: '5px !important', sm: 0 }} w="100%">
        <Flex justify="space-between" flexDirection={'column'}>
          <chakra.h3 fontSize={{ base: 'lg', md: '2xl' }} fontWeight="bold" noOfLines={2}>
            {postData.Nombre}
          </chakra.h3>
          <chakra.h4 fontSize={{ base: 'md', md: 'lg' }} fontWeight="medium" noOfLines={1}>
            {postData.Publicante ?? postData.Agronomia}
          </chakra.h4>
        </Flex>
        <Tag
          size={'md'}
          colorScheme="green"
          w="fit-content"
          _hover={{ cursor: 'pointer' }}
          onClick={() => {
            console.log('Clicked');
          }}>
          {postData.Categoria}
        </Tag>
        <Accordion defaultIndex={[0]} allowToggle w="100%">
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  Descripción
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Text fontSize={{ md: 'md', sm: 'sm' }} fontWeight="500">
                {postData.Descripcion}
              </Text>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  Propiedades
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <SimpleGrid as={List} spacing={2} columns={{ sm: 2, md: 3 }}>
                {postData?.Propiedades.map((propiedad, index) => (
                  <ListItem key={'propiedad-' + index}>
                    <ListIcon as={IoMdCheckmarkCircle} color="green.500" />
                    {propiedad}
                  </ListItem>
                ))}
              </SimpleGrid>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
        <Stack
          direction={{ md: 'row', sm: 'column' }}
          justify="space-between"
          alignItems={{ sm: 'flex-start', md: 'center' }}
          spacing={{ sm: '10%' }}>
          <Stack direction={'row'} spacing={2} alignItems={'center'}>
            <Icon as={FaMapMarkerAlt} h={4} w={4} />
            <Text fontSize="sm" mt={{ base: 1, sm: 0 }} noOfLines={1}>
              {postData.Localidad} - {postData.Provincia}
            </Text>
          </Stack>
          <Stack
            direction="row"
            spacing={1}
            mb="0 !important"
            alignItems="center"
            justifyContent={{ md: 'normal', sm: 'space-between' }}
            width={{ md: 'auto', sm: 'full' }}>
            <Button
              leftIcon={<FaShareAlt />}
              variant="outline"
              size="md"
              mr={2}
              onClick={() => {
                navigator.share &&
                  navigator
                    .share({
                      title: 'Publicación de Agroganás - ' + postData.Nombre,
                      url: 'https://agroganas.com/post/' + postData.id,
                    })
                    .then(() => {
                      toast({
                        title: 'Compartido',
                        description: 'La publicación ha sido compartida con éxito',
                        status: 'success',
                        duration: 4000,
                        isClosable: true,
                      });
                    })
                    .catch((err) => {
                      toast({
                        title: 'Error',
                        description: 'No se ha podido compartir la publicación',
                        status: 'error',
                        duration: 9000,
                        isClosable: true,
                      });
                    });
              }}>
              Compartir
            </Button>
            <Button
              as="a"
              leftIcon={<FaClipboardCheck />}
              variant="solid"
              size="md"
              mr={2}
              colorScheme="green"
              href={
                'https://form.jotform.com/210891397728670?productoA=' +
                postData.Nombre +
                '&anunciante=' +
                (postData.Publicante ?? postData.Agronomia)
              }
              target="_blank">
              Consultar
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default PostView;
