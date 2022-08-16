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
} from '@chakra-ui/react';
import React from 'react';
import { FaExclamation, FaHeart, FaPhone } from 'react-icons/fa';
import { PostDTO } from '../../utils/interfaces';
import { Swiper, SwiperSlide } from 'swiper/react';

// Styles must use direct files imports
import 'swiper/swiper.scss'; // core Swiper
import 'swiper/modules/navigation/navigation.scss'; // Navigation module
import 'swiper/modules/pagination/pagination.scss'; // Pagination module
import 'swiper/modules/effect-cards/effect-cards.scss'; // Effect Cards module

import './styles.css';

import { EffectCards } from 'swiper';

interface PostViewProps {
  styles: StackProps;
  postData: PostDTO;
}

const PostView: React.FC<PostViewProps> = ({ styles, postData }) => {
  console.log('Data: ', postData);
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
            <SwiperSlide>
              <Image
                rounded="md"
                w={{ base: '100%', md: '30rem' }}
                h="auto"
                objectFit="cover"
                src={postData.Imagen}
                alt="product image"
                onLoad={() =>
                  setTimeout(() => {
                    setImageLoaded(true);
                  }, 2000)
                }
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                rounded="md"
                w={{ base: '100%', md: '30rem' }}
                h="auto"
                objectFit="cover"
                src={postData.Imagen}
                alt="product image"
                onLoad={() =>
                  setTimeout(() => {
                    setImageLoaded(true);
                  }, 2000)
                }
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                rounded="md"
                w={{ base: '100%', md: '30rem' }}
                h="auto"
                objectFit="cover"
                src={postData.Imagen}
                alt="product image"
                onLoad={() =>
                  setTimeout(() => {
                    setImageLoaded(true);
                  }, 2000)
                }
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                rounded="md"
                w={{ base: '100%', md: '30rem' }}
                h="auto"
                objectFit="cover"
                src={postData.Imagen}
                alt="product image"
                onLoad={() =>
                  setTimeout(() => {
                    setImageLoaded(true);
                  }, 2000)
                }
              />
            </SwiperSlide>
          </Swiper>
        </Skeleton>
      </Flex>
      <Stack direction="column" spacing={2} w="100%" mt={{ base: '5px !important', sm: 0 }}>
        <Flex justify="space-between" flexDirection={'column'}>
          <chakra.h3 fontSize={{ base: 'lg', md: 'xl' }} fontWeight="bold" noOfLines={2}>
            {postData.Nombre}
          </chakra.h3>
          <chakra.h4 fontSize={{ base: 'sm', md: 'md' }} fontWeight="bold" noOfLines={1}>
            {postData.Agronomia}
          </chakra.h4>
        </Flex>
        <Flex alignItems="center" color="gray.500">
          <Icon as={FaPhone} />
        </Flex>
        <Stack
          direction={{ base: 'column-reverse', sm: 'row' }}
          justify="space-between"
          alignItems={{ base: 'flex-start', sm: 'center' }}>
          <Text fontSize="sm" mt={{ base: 1, sm: 0 }}>
            Updated
          </Text>
          <Stack direction="row" spacing={1} mb="0 !important">
            <IconButton aria-label="test">
              <Icon as={FaHeart} w={4} h={4} />
            </IconButton>
            <IconButton aria-label="test2" bg="green.500" color="white">
              <Icon as={FaPhone} w={4} h={4} />
              <Text fontSize="sm">Show Phone no.</Text>
            </IconButton>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default PostView;
