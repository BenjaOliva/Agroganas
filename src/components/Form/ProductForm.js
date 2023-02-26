import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  chakra,
  FormErrorMessage,
  Box,
  Flex,
  Button,
  Divider,
  useColorModeValue,
  SimpleGrid,
  GridItem,
  Stack,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Textarea,
  Checkbox,
  Center,
  Switch,
  Select,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';
import { FilePond, registerPlugin } from 'react-filepond';

// Import FilePond styles
import 'filepond/dist/filepond.min.css';

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
// `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const ProductForm = ({ onClose }) => {
  const [files, setFiles] = useState([]);
  const [Loading, setLoading] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  function onSubmit(values) {
    return new Promise((resolve) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        resolve();
      }, 1000);
    });
  }
  const options = [
    { value: 'Rojo', label: 'Rojo' },
    { value: 'Azul', label: 'Azul' },
    { value: 'Verde', label: 'Verde' },
    { value: 'Amarillo', label: 'Amarillo' },
    { value: 'Naranja', label: 'Naranja' },
    { value: 'Negro', label: 'Negro' },
    { value: 'Blanco', label: 'Blanco' },
  ];
  const sizeOptions = [
    { value: 'xxl', label: 'XXL' },
    { value: 'xl', label: 'XL' },
    { value: 'l', label: 'L' },
    { value: 'm', label: 'M' },
    { value: 's', label: 'S' },
    { value: 'xs', label: 'XS' },
  ];

  const isDark = useColorModeValue(false, true);

  return Loading ? null : (
    <Box bg={isDark ? 'gray.50' : 'inherit'}>
      <Box>
        <GridItem mt={[5, null, 0]} colSpan={{ md: 2 }}>
          <chakra.form method="POST" overflow={{ sm: 'hidden' }} onSubmit={handleSubmit(onSubmit)}>
            <Stack
              px={4}
              py={5}
              bg={isDark ? 'white' : 'gray.700'}
              spacing={6}
              p={{ sm: 4, md: 6 }}>
              <Accordion allowToggle>
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box flex="1" textAlign="left">
                        Imágenes y videos
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <FormControl isInvalid={errors.files}>
                      <FormLabel
                        fontSize="sm"
                        fontWeight="md"
                        color={isDark ? 'gray.700' : 'gray.50'}>
                        Imágenes de la Publicación
                      </FormLabel>
                      <FilePond
                        files={files}
                        onupdatefiles={setFiles}
                        allowMultiple={true}
                        imagePreviewMaxHeight={82}
                        maxFiles={5}
                        acceptedFileTypes={['image/*']}
                        name="files"
                        labelIdle='Arrastre las iamgenes o <span class="filepond--label-action"> Busquelas aqui </span>'
                      />
                      <FormErrorMessage>{errors.files && errors.files.message}</FormErrorMessage>
                    </FormControl>
                  </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box flex="1" textAlign="left">
                        Información de la Publicación
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <FormControl as={GridItem} colSpan={[3, 2]} isInvalid={errors.title}>
                      <FormLabel
                        fontSize="sm"
                        fontWeight="md"
                        color={isDark ? 'gray.700' : 'gray.50'}>
                        Titulo
                      </FormLabel>
                      <Input
                        type="text"
                        placeholder="Titulo..."
                        focusBorderColor="brand.400"
                        rounded="md"
                        id="title"
                        {...register('title', {
                          required: 'Este campo es obligatorio',
                        })}
                      />
                      <FormHelperText>Escriba una Titulo para esta publicación.</FormHelperText>
                      <FormErrorMessage>{errors.title && errors.title.message}</FormErrorMessage>
                    </FormControl>
                    <FormControl mt={1} isInvalid={errors.description}>
                      <FormLabel
                        fontSize="sm"
                        fontWeight="md"
                        color={isDark ? 'gray.700' : 'gray.50'}>
                        Descripción
                      </FormLabel>
                      <Textarea
                        placeholder="Este producto/servicio..."
                        mt={1}
                        rows={3}
                        shadow="sm"
                        focusBorderColor="brand.400"
                        fontSize={{ sm: 'sm' }}
                        id="description"
                        {...register('description', {
                          required: 'Este campo es obligatorio',
                        })}
                      />
                      <FormHelperText>
                        Escriba una Descripción para esta publicación.
                      </FormHelperText>
                      <FormErrorMessage>
                        {errors.description && errors.description.message}
                      </FormErrorMessage>
                    </FormControl>
                    <SimpleGrid minChildWidth="80px" spacing={5}>
                      <FormControl as={GridItem} colSpan={[3, 2]} isInvalid={errors.category}>
                        <FormLabel
                          fontSize="sm"
                          fontWeight="md"
                          color={isDark ? 'gray.700' : 'gray.50'}>
                          Categoría
                        </FormLabel>
                        <Select
                          placeholder="Seleccione una categoría..."
                          id="category"
                          {...register('category', { required: 'Debe elegir una categoría' })}>
                          <option value="1">Remeras</option>
                          <option value="2">Buzos</option>
                          <option value="3">Pantalon</option>
                          <option value="4">Conjunto</option>
                        </Select>
                        <FormErrorMessage>
                          {errors.category && errors.category.message}
                        </FormErrorMessage>
                      </FormControl>
                      <FormControl as={GridItem} colSpan={[3, 2]}>
                        <FormLabel
                          fontSize="sm"
                          fontWeight="md"
                          color={isDark ? 'gray.700' : 'gray.50'}>
                          Agronomía
                        </FormLabel>
                        <Select
                          placeholder="Seleccione una Agronomía..."
                          id="brand"
                          {...register('brand')}>
                          <option value="option1">Sin Agronomía</option>
                        </Select>
                      </FormControl>
                    </SimpleGrid>
                  </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box flex="1" textAlign="left">
                        Estados de la Publicación
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <SimpleGrid minChildWidth={'10vw'} spacing={1} width="100%" columns={4}>
                      <FormControl as={GridItem} colSpan={[3, 2]}>
                        <Center h={'12vh'}>
                          <Checkbox colorScheme="green">La publicación está en oferta</Checkbox>
                        </Center>
                      </FormControl>
                      <FormControl as={GridItem} colSpan={[3, 2]}>
                        <Center h={'12vh'}>
                          <Checkbox colorScheme="green">La publicación está destacada</Checkbox>
                        </Center>
                      </FormControl>
                      <FormControl as={GridItem} colSpan={[3, 2]}>
                        <Center h={'12vh'}>
                          <Checkbox colorScheme="green">La publicación está verificada</Checkbox>
                        </Center>
                      </FormControl>
                      <FormControl
                        display="flex"
                        alignItems="center"
                        colSpan={[3, 2]}
                        w="100%"
                        as={GridItem}
                        justifyContent="center">
                        <FormLabel htmlFor="available" mb="0">
                          Publicación habilitada:
                        </FormLabel>
                        <Switch
                          id="available"
                          {...register('available')}
                          colorScheme="green"
                          defaultChecked
                        />
                      </FormControl>
                    </SimpleGrid>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </Stack>
            <Divider orientation="horizontal" />
            <Flex justifyContent={'flex-end'} m={5}>
              <Button colorScheme={'red'} mr={3} onClick={onClose} isLoading={isSubmitting}>
                Cancelar
              </Button>
              <Button colorScheme={'green'} type="submit" isLoading={isSubmitting}>
                Guardar
              </Button>
            </Flex>
          </chakra.form>
        </GridItem>
      </Box>
    </Box>
  );
};

export default ProductForm;
