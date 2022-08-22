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
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import * as React from 'react';
import { BsSearch } from 'react-icons/bs';
import { RiAddFill, RiArrowRightUpLine } from 'react-icons/ri';
import ProductForm from './../Form/ProductForm';
import { useAsyncDebounce } from 'react-table';
import { useState } from 'react';

export const TableActions = ({ filter, setFilter, ...props }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [value, setValue] = useState(filter);
  const onChange = useAsyncDebounce((value) => {
    setFilter(value || undefined);
  }, 500);

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
            <InputGroup size="sm">
              <FormLabel srOnly>Buscar...</FormLabel>
              <InputLeftElement pointerEvents="none" color="gray.400">
                <BsSearch />
              </InputLeftElement>
              <Input
                rounded="base"
                type="search"
                placeholder="Buscar..."
                value={value || ''}
                onChange={(e) => {
                  setValue(e.target.value);
                  onChange(e.target.value);
                }}
              />
            </InputGroup>
          </FormControl>
        </HStack>
        <ButtonGroup size="sm" variant="outline" hidden={props.isSells}>
          <Button iconSpacing="0.5" leftIcon={<RiAddFill fontSize="1.25em" />} onClick={onOpen}>
            Nueva Publicación
          </Button>
          <Button
            iconSpacing="0.5"
            leftIcon={<RiArrowRightUpLine fontSize="1.25em" />}
            onClick={() => alert('Esta opción aún no esta disponible!')}>
            Exportar Excel
          </Button>
        </ButtonGroup>
      </Stack>
      <Modal size={'6xl'} isOpen={isOpen} onClose={onClose} scrollBehavior="inside" isCentered>
        <ModalOverlay />
        <ModalContent p={0}>
          <ModalHeader>Crear Publicación</ModalHeader>
          <ModalCloseButton />
          <ModalBody p={0}>
            <ProductForm onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
