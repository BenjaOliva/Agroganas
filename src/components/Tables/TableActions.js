import {
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Stack,
  Box,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import * as React from 'react';
import { BsSearch } from 'react-icons/bs';
import { RiAddFill, RiArrowRightUpLine } from 'react-icons/ri';
import ProductForm from './../Form/ProductForm';

export const TableActions = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Stack
        spacing="4"
        direction={{
          base: 'column',
          md: 'row',
        }}
        justify="space-between">
        <HStack>
          <FormControl
            minW={{
              md: '300px',
            }}
            id="search">
            <InputGroup size="md">
              <FormLabel srOnly>Buscar...</FormLabel>
              <InputLeftElement pointerEvents="none" color="gray.400">
                <BsSearch />
              </InputLeftElement>
              <Input
                rounded="base"
                type="search"
                placeholder="Buscar..."
                onChange={(e) => props.handleSearch(e)}
              />
            </InputGroup>
          </FormControl>
          <Box
            w={{
              base: '300px',
            }}
            hidden={props.isSells}>
            <Select rounded="base" size="md" placeholder="Todas las Marcas">
              <option>Addidas</option>
              <option>Nike</option>
              <option>Reebook</option>
              <option>Topper</option>
              <option>Otras Marcas</option>
            </Select>
          </Box>
        </HStack>
        <ButtonGroup size="sm" variant="outline" hidden={props.isSells}>
          <Button iconSpacing="0.5" leftIcon={<RiAddFill fontSize="1.25em" />} onClick={onOpen}>
            Nuevo Producto
          </Button>
          <Button iconSpacing="0.5" leftIcon={<RiArrowRightUpLine fontSize="1.25em" />}>
            Exportar Excel
          </Button>
        </ButtonGroup>
      </Stack>
      <Modal size={"6xl"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Cargar nuevo Producto</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ProductForm onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
