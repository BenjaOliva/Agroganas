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
  InputGroup,
  FormHelperText,
  Textarea,
  InputLeftElement,
  Checkbox,
  Center,
  Switch,
  Select,
} from '@chakra-ui/react';
import { FilePond, registerPlugin } from 'react-filepond';
import { CUIAutoComplete } from 'chakra-ui-autocomplete';
import { Autocomplete, Option } from 'chakra-ui-simple-autocomplete';

// Import FilePond styles
import 'filepond/dist/filepond.min.css';

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
// `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import ChakraTagInputTag from './../TagInput/Tag';

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



  const [colors, setColors] = React.useState([]);
  const [size, setSize] = React.useState([]);

  return Loading ? null : (
    <Box bg={useColorModeValue('gray.50', 'inherit')}>
      <Box>
        <GridItem mt={[5, null, 0]} colSpan={{ md: 2 }}>
          <chakra.form method="POST" overflow={{ sm: 'hidden' }} onSubmit={handleSubmit(onSubmit)}>
            <Stack
              px={4}
              py={5}
              bg={useColorModeValue('white', 'gray.700')}
              spacing={6}
              p={{ sm: 6 }}>
              <FormControl as={GridItem} colSpan={[3, 2]} isInvalid={errors.title}>
                <FormLabel
                  fontSize="sm"
                  fontWeight="md"
                  color={useColorModeValue('gray.700', 'gray.50')}>
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
                <FormHelperText>Escriba una Titulo para este producto.</FormHelperText>
                <FormErrorMessage>{errors.title && errors.title.message}</FormErrorMessage>
              </FormControl>
              <FormControl mt={1} isInvalid={errors.description}>
                <FormLabel
                  fontSize="sm"
                  fontWeight="md"
                  color={useColorModeValue('gray.700', 'gray.50')}>
                  Descripción
                </FormLabel>
                <Textarea
                  placeholder="Este producto..."
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
                <FormHelperText>Escriba una Descripción para este producto.</FormHelperText>
                <FormErrorMessage>
                  {errors.description && errors.description.message}
                </FormErrorMessage>
              </FormControl>
              <SimpleGrid minChildWidth="80px" spacing={5}>
                <FormControl as={GridItem} colSpan={[3, 2]} isInvalid={errors.price}>
                  <FormLabel
                    fontSize="sm"
                    fontWeight="md"
                    color={useColorModeValue('gray.700', 'gray.50')}>
                    Precio
                  </FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      color="gray.300"
                      fontSize="1.2em"
                      children="$"
                    />
                    <Input
                      type="number"
                      id="price"
                      {...register('price', {
                        required: 'Este campo es obligatorio',
                      })}
                    />
                  </InputGroup>
                  <FormHelperText>Ingrese el precio del producto.</FormHelperText>
                  <FormErrorMessage>{errors.price && errors.price.message}</FormErrorMessage>
                </FormControl>
                <FormControl as={GridItem} colSpan={[3, 2]} isInvalid={errors.category}>
                  <FormLabel
                    fontSize="sm"
                    fontWeight="md"
                    color={useColorModeValue('gray.700', 'gray.50')}>
                    Categoria
                  </FormLabel>
                  <Select
                    placeholder="Seleccione una categoria..."
                    id="category"
                    {...register('category', { required: 'Debe elegir una categoria' })}>
                    <option value="1">Remeras</option>
                    <option value="2">Buzos</option>
                    <option value="3">Pantalon</option>
                    <option value="4">Conjunto</option>
                  </Select>
                  <FormErrorMessage>{errors.category && errors.category.message}</FormErrorMessage>
                </FormControl>
                <FormControl as={GridItem} colSpan={[3, 2]}>
                  <FormLabel
                    fontSize="sm"
                    fontWeight="md"
                    color={useColorModeValue('gray.700', 'gray.50')}>
                    Marca
                  </FormLabel>
                  <Select placeholder="Seleccione una marca..." id="brand" {...register('brand')}>
                    <option value="option1">Sin Marca</option>
                    <option value="Nike">Nike</option>
                    <option value="Addidas">Addidas</option>
                    <option value="Topper">Topper</option>
                  </Select>
                </FormControl>
              </SimpleGrid>
              <SimpleGrid minChildWidth="80px" spacing={5}>
                <FormControl as={GridItem} colSpan={[3, 2]} isInvalid={errors.stock}>
                  <FormLabel
                    fontSize="sm"
                    fontWeight="md"
                    color={useColorModeValue('gray.700', 'gray.50')}>
                    Stock Disponible
                  </FormLabel>
                  <Input
                    type="number"
                    focusBorderColor="brand.400"
                    rounded="md"
                    id="stock"
                    {...register('stock', {
                      required: 'Debe colocar una cantidad valida.',
                    })}
                  />
                  <FormHelperText>Ingrese la cantidad de stock.</FormHelperText>
                  <FormErrorMessage>{errors.stock && errors.stock.message}</FormErrorMessage>
                </FormControl>
                <FormControl as={GridItem} colSpan={[3, 2]}>
                  <FormLabel
                    fontSize="sm"
                    fontWeight="md"
                    color={useColorModeValue('gray.700', 'gray.50')}>
                    SKU (Código de Identificación)
                  </FormLabel>
                  <Input
                    type="text"
                    focusBorderColor="brand.400"
                    rounded="md"
                    id="SKU"
                    {...register('SKU')}
                  />
                </FormControl>
                <FormControl as={GridItem} colSpan={[3, 2]}>
                  <Center h={'12vh'}>
                    <Checkbox colorScheme="green">El producto esta en oferta</Checkbox>
                  </Center>
                </FormControl>
              </SimpleGrid>
              <SimpleGrid minChildWidth="80px" spacing={5}>
                <FormControl as={GridItem} colSpan={[3, 2]} w={'180'}>
                  <FormLabel
                    fontSize="sm"
                    fontWeight="md"
                    color={useColorModeValue('gray.700', 'gray.50')}>
                    Colores Disponibles:
                  </FormLabel>
                  <Autocomplete
                    options={options}
                    result={colors}
                    setResult={(options) => {
                      setColors(options);
                    }}
                    placeholder="Escriba los colores que desee..."
                  />
                </FormControl>
                <FormControl as={GridItem} colSpan={[3, 2]}>
                  <FormLabel
                    fontSize="sm"
                    fontWeight="md"
                    color={useColorModeValue('gray.700', 'gray.50')}>
                    Tamaños Disponibles
                  </FormLabel>
                  <Autocomplete
                    options={sizeOptions}
                    result={size}
                    setResult={(options) => {
                      setSize(options);
                    }}
                    placeholder="Escriba los talles que desee..."
                  />
                </FormControl>
                <Center h={'12vh'}>
                  <FormControl display="flex" alignItems="center">
                    <FormLabel htmlFor="email-alerts" mb="0">
                      Producto habilitado:
                    </FormLabel>
                    <Switch id="email-alerts" id="available" {...register('available')} />
                  </FormControl>
                </Center>
              </SimpleGrid>
              <FormControl isInvalid={errors.files}>
                <FormLabel
                  fontSize="sm"
                  fontWeight="md"
                  color={useColorModeValue('gray.700', 'gray.50')}>
                  Imagenes del Producto
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
            </Stack>
            <Divider orientation="horizontal" />
            <Flex justifyContent={'flex-end'} my={5}>
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
