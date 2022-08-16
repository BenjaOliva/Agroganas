import React, { useEffect, useState } from 'react';
// Chakra imports
import {
  Flex,
  IconButton,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  chakra,
  Td,
  SimpleGrid,
  Badge,
  ButtonGroup,
  Button,
  TableContainer,
  Center,
  Select,
  Tooltip,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
// Custom components
import Card from '../../components/Card/Card.js';
import CardHeader from '../../components/Card/CardHeader.js';
import CardBody from '../../components/Card/CardBody.js';
import { dashboardTableData } from '../../variables/general';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  TriangleDownIcon,
  TriangleUpIcon,
} from '@chakra-ui/icons';
import { useTable, useSortBy, useGlobalFilter, usePagination, useFilters } from 'react-table';
import { TableActions } from '../../components/Tables/TableActions';
import { FaTrash } from 'react-icons/fa';
import Pagination from './../../components/Tables/Pagination';
import DashboardTableRow from '../../components/Tables/DashboardTableRow';
import PostView from '../../components/Posts/PostView.tsx';

function Tables({ tableData }) {
  const textColor = useColorModeValue('gray.700', 'white');
  const headerBgColor = useColorModeValue('gray.300', 'gray.900');
  var items = [
    {
      id: 'az23dgf2021dgf',
      Nombre: 'Herbcida Cletodim 23%',
      Descripcion:
        'Actúa en post-emergencia para el control de gramíneas anuales y perennes. Una vez aplicado, se absorbe rápidamente por el follaje, translocándose por floema y xilema.',
      Agronomia: 'Agronomía Test',
      Categoria: 'Categoria Test',
      Principal: false,
      Destacado: true,
      Oferta: true,
      Imagen: [
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150',
      ],
      Propiedades: '',
      PrpiedadesTexto: 'Testing props',
      Publicante: null,
      Provincia: 'Provincia Test',
      Localidad: 'Localidad Test',
    },
    {
      id: 'az23dgf2021dgf',
      Nombre: 'Herbcida Cletodim 24%',
      Descripcion:
        'Actúa en post-emergencia para el control de gramíneas anuales y perennes. Una vez aplicado, se absorbe rápidamente por el follaje, translocándose por floema y xilema.',
      Agronomia: 'Agronomía Test',
      Categoria: 'Categoria Test',
      Principal: false,
      Destacado: true,
      Oferta: true,
      Imagen: [
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150',
      ],
      Propiedades: '',
      PrpiedadesTexto: 'Testing props',
      Publicante: 'Publicante Test',
      Provincia: 'Provincia Test',
      Localidad: 'Localidad Test',
    },
    {
      id: 'az23dgf2021dgf',
      Nombre: 'Herbcida Cletodim 24%',
      Descripcion:
        'Actúa en post-emergencia para el control de gramíneas anuales y perennes. Una vez aplicado, se absorbe rápidamente por el follaje, translocándose por floema y xilema.',
      Agronomia: 'Agronomía Test',
      Categoria: 'Categoria Test',
      Principal: false,
      Destacado: true,
      Oferta: true,
      Imagen: [
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150',
      ],
      Propiedades: '',
      PrpiedadesTexto: 'Testing props',
      Publicante: 'Publicante Test',
      Provincia: 'Provincia Test',
      Localidad: 'Localidad Test',
    },
    {
      id: 'az23dgf2021dgf',
      Nombre: 'Herbcida Cletodim 24%',
      Descripcion:
        'Actúa en post-emergencia para el control de gramíneas anuales y perennes. Una vez aplicado, se absorbe rápidamente por el follaje, translocándose por floema y xilema.',
      Agronomia: 'Agronomía Test',
      Categoria: 'Categoria Test',
      Principal: false,
      Destacado: true,
      Oferta: true,
      Imagen: [
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150',
      ],
      Propiedades: '',
      PrpiedadesTexto: 'Testing props',
      Publicante: 'Publicante Test',
      Provincia: 'Provincia Test',
      Localidad: 'Localidad Test',
    },
    {
      id: 'az23dgf2021dgf',
      Nombre: 'Herbcida Cletodim 24%',
      Descripcion:
        'Actúa en post-emergencia para el control de gramíneas anuales y perennes. Una vez aplicado, se absorbe rápidamente por el follaje, translocándose por floema y xilema.',
      Agronomia: 'Agronomía Test',
      Categoria: 'Categoria Test',
      Principal: false,
      Destacado: true,
      Oferta: true,
      Imagen: [
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150',
      ],
      Propiedades: '',
      PrpiedadesTexto: 'Testing props',
      Publicante: 'Publicante Test',
      Provincia: 'Provincia Test',
      Localidad: 'Localidad Test',
    },
    {
      id: 'az23dgf2021dgf',
      Nombre: 'Herbcida Cletodim 24%',
      Descripcion:
        'Actúa en post-emergencia para el control de gramíneas anuales y perennes. Una vez aplicado, se absorbe rápidamente por el follaje, translocándose por floema y xilema.',
      Agronomia: 'Agronomía Test',
      Categoria: 'Categoria Test',
      Principal: false,
      Destacado: true,
      Oferta: true,
      Imagen: [
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150',
      ],
      Propiedades: '',
      PrpiedadesTexto: 'Testing props',
      Publicante: 'Publicante Test',
      Provincia: 'Provincia Test',
      Localidad: 'Localidad Test',
    },
    {
      id: 'az23dgf2021dgf',
      Nombre: 'Herbcida Cletodim 24%',
      Descripcion:
        'Actúa en post-emergencia para el control de gramíneas anuales y perennes. Una vez aplicado, se absorbe rápidamente por el follaje, translocándose por floema y xilema.',
      Agronomia: 'Agronomía Test',
      Categoria: 'Categoria Test',
      Principal: false,
      Destacado: true,
      Oferta: true,
      Imagen: [
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150',
      ],
      Propiedades: '',
      PrpiedadesTexto: 'Testing props',
      Publicante: 'Publicante Test',
      Provincia: 'Provincia Test',
      Localidad: 'Localidad Test',
    },
    {
      id: 'az23dgf2021dgf',
      Nombre: 'Herbcida Cletodim 24%',
      Descripcion:
        'Actúa en post-emergencia para el control de gramíneas anuales y perennes. Una vez aplicado, se absorbe rápidamente por el follaje, translocándose por floema y xilema.',
      Agronomia: 'Agronomía Test',
      Categoria: 'Categoria Test',
      Principal: false,
      Destacado: true,
      Oferta: true,
      Imagen: [
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150',
      ],
      Propiedades: '',
      PrpiedadesTexto: 'Testing props',
      Publicante: 'Publicante Test',
      Provincia: 'Provincia Test',
      Localidad: 'Localidad Test',
    },
    {
      id: 'az23dgf2021dgf',
      Nombre: 'Herbcida Cletodim 24%',
      Descripcion:
        'Actúa en post-emergencia para el control de gramíneas anuales y perennes. Una vez aplicado, se absorbe rápidamente por el follaje, translocándose por floema y xilema.',
      Agronomia: 'Agronomía Test',
      Categoria: 'Categoria Test',
      Principal: false,
      Destacado: true,
      Oferta: true,
      Imagen: [
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150',
      ],
      Propiedades: '',
      PrpiedadesTexto: 'Testing props',
      Publicante: 'Publicante Test',
      Provincia: 'Provincia Test',
      Localidad: 'Localidad Test',
    },
    {
      id: 'az23dgf2021dgf',
      Nombre: 'Herbcida Cletodim 24%',
      Descripcion:
        'Actúa en post-emergencia para el control de gramíneas anuales y perennes. Una vez aplicado, se absorbe rápidamente por el follaje, translocándose por floema y xilema.',
      Agronomia: 'Agronomía Test',
      Categoria: 'Categoria Test',
      Principal: false,
      Destacado: true,
      Oferta: true,
      Imagen: [
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150',
      ],
      Propiedades: '',
      PrpiedadesTexto: 'Testing props',
      Publicante: 'Publicante Test',
      Provincia: 'Provincia Test',
      Localidad: 'Localidad Test',
    },
    {
      id: 'az23dgf2021dgf',
      Nombre: 'Herbcida Cletodim 24%',
      Descripcion:
        'Actúa en post-emergencia para el control de gramíneas anuales y perennes. Una vez aplicado, se absorbe rápidamente por el follaje, translocándose por floema y xilema.',
      Agronomia: 'Agronomía Test',
      Categoria: 'Categoria Test',
      Principal: false,
      Destacado: true,
      Oferta: true,
      Imagen: [
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150',
      ],
      Propiedades: '',
      PrpiedadesTexto: 'Testing props',
      Publicante: 'Publicante Test',
      Provincia: 'Provincia Test',
      Localidad: 'Localidad Test',
    },
  ];

  const [lookUpData, setLookUpData] = useState(null);

  const [data, setData] = useState(items);

  const columns = React.useMemo(
    () => [
      {
        Header: 'SKU (ID)',
        accessor: 'id',
        Cell: ({ cell: { value } }) => (
          <Text maxW={'100%'} isTruncated>
            {value}
          </Text>
        ),
      },
      {
        Header: 'Titulo',
        accessor: 'Nombre',
      },
      {
        Header: 'Categoria',
        accessor: 'Categoria',
      },
      {
        Header: 'Agronomia',
        accessor: 'Agronomia',
      },
      {
        Header: 'En Principal',
        centerTitle: true,
        accessor: 'Principal',
        Cell: ({
          row: {
            original: { Principal },
          },
        }) => (
          <Center>
            <Badge colorScheme={Principal ? 'green' : 'red'} borderRadius="5px">
              {Principal ? 'Visible' : 'No Visible'}
            </Badge>
          </Center>
        ),
      },
      {
        Header: 'Destacado',
        centerTitle: true,
        accessor: 'Destacado',
        Cell: ({
          row: {
            original: { Destacado },
          },
        }) => (
          <Center>
            <Badge colorScheme={Destacado ? 'green' : 'red'} borderRadius="5px">
              {Destacado ? 'Destacado' : 'No Destacado'}
            </Badge>
          </Center>
        ),
      },
      {
        Header: 'Estado',
        centerTitle: true,
        accessor: 'status',
        Cell: ({
          row: {
            original: { status },
          },
        }) => {
          return (
            <Center>
              <Badge colorScheme={status ? 'green' : 'red'} borderRadius="5px">
                {status ? 'Activa' : 'Inactiva'}
              </Badge>
            </Center>
          );
        },
      },
      {
        Header: 'Acción',
        accessor: 'action',
        Cell: () => (
          <ButtonGroup size="sm" isAttached variant="outline">
            <Button colorScheme={'orange'} borderRadius="5px">
              Editar
            </Button>
            <IconButton
              borderRadius="5px"
              colorScheme={'red'}
              aria-label="Add to friends"
              icon={<FaTrash />}
            />
          </ButtonGroup>
        ),
      },
    ],
    []
  );

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (lookUpData) {
      onOpen();
    }
  }, [lookUpData]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state,
    setGlobalFilter,
    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { globalFilter } = state;

  const isDark = useColorModeValue(false, true);

  return (
    <Flex direction="column" pt={{ base: '120px', md: '75px' }}>
      <Card>
        <CardHeader p="6px 0px 22px 0px" w="100%">
          <SimpleGrid columns={1} spacing={5} w="100%">
            <Text fontSize="xl" color={textColor} fontWeight="bold">
              Lista de Publicaciones
            </Text>
            <TableActions filter={globalFilter} setFilter={setGlobalFilter} />{' '}
          </SimpleGrid>
        </CardHeader>
        <CardBody w="100%" height={'70vh'}>
          <VStack w="100%">
            <TableContainer height={'90%'} overflowY="scroll" pos={'relative'}>
              <Table {...getTableProps()} variant="simple">
                <Thead pos={'sticky'} top={0} bgColor={headerBgColor}>
                  {headerGroups.map((headerGroup) => (
                    <Tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => (
                        <Th
                          {...column.getHeaderProps(column.getSortByToggleProps())}
                          isNumeric={column.isNumeric}
                          textAlign={column.centerTitle ? 'center' : 'left'}>
                          {column.render('Header')}
                          <chakra.span pl="4">
                            {column.isSorted ? (
                              column.isSortedDesc ? (
                                <TriangleDownIcon aria-label="sorted descending" />
                              ) : (
                                <TriangleUpIcon aria-label="sorted ascending" />
                              )
                            ) : null}
                          </chakra.span>
                        </Th>
                      ))}
                    </Tr>
                  ))}
                </Thead>
                <Tbody {...getTableBodyProps()} bgColor={useColorModeValue('white', 'gray.800')}>
                  {page.map((row) => {
                    prepareRow(row);
                    return (
                      <Tr
                        {...row.getRowProps()}
                        _hover={{
                          bg: isDark ? 'gray.700' : 'gray.200',
                          cursor: 'pointer',
                        }}>
                        {row.cells.map((cell) => (
                          <Td
                            {...cell.getCellProps()}
                            isNumeric={cell.column.isNumeric}
                            onClick={() =>
                              cell.column.id !== 'action' && setLookUpData(row.original)
                            }>
                            {cell.render('Cell')}
                          </Td>
                        ))}
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </TableContainer>
            <Flex justifyContent="space-between" m={4} alignItems="center" w="100%">
              <Flex>
                <Tooltip label="Primer página">
                  <IconButton
                    onClick={() => gotoPage(0)}
                    isDisabled={!canPreviousPage}
                    icon={<ArrowLeftIcon h={3} w={3} />}
                    mr={'5%'}
                  />
                </Tooltip>
                <Tooltip label="Página anterior">
                  <IconButton
                    onClick={previousPage}
                    isDisabled={!canPreviousPage}
                    icon={<ChevronLeftIcon h={6} w={6} />}
                  />
                </Tooltip>
              </Flex>

              <Flex alignItems="center" justifyContent={'center'}>
                <Text flexShrink="0" mr={8} fontSize={{ base: 'sm', md: 'md' }}>
                  Página{' '}
                  <Text fontWeight="bold" as="span" fontSize={{ base: 'sm', md: 'md' }}>
                    {pageIndex + 1}
                  </Text>{' '}
                  de{' '}
                  <Text fontWeight="bold" as="span" fontSize={{ base: 'sm', md: 'md' }}>
                    {pageOptions.length}
                  </Text>
                </Text>
                <Text
                  flexShrink="0"
                  fontSize={{ base: 'sm', md: 'md' }}
                  display={{ sm: 'none', md: 'flex' }}>
                  Ir a página:
                </Text>{' '}
                <NumberInput
                  ml={2}
                  mr={8}
                  w={28}
                  min={1}
                  max={pageOptions.length}
                  onChange={(value) => {
                    const page = value ? value - 1 : 0;
                    gotoPage(page);
                  }}
                  defaultValue={pageIndex + 1}
                  display={{ sm: 'none', md: 'flex' }}>
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <Select
                  w={'40%'}
                  value={pageSize}
                  onChange={(e) => {
                    setPageSize(Number(e.target.value));
                  }}
                  display={{ sm: 'none', md: 'flex' }}>
                  {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                    <option key={pageSize} value={pageSize}>
                      Ver de a {pageSize}
                    </option>
                  ))}
                </Select>
              </Flex>

              <Flex>
                <Tooltip label="Next Page">
                  <IconButton
                    onClick={nextPage}
                    isDisabled={!canNextPage}
                    icon={<ChevronRightIcon h={6} w={6} />}
                  />
                </Tooltip>
                <Tooltip label="Last Page">
                  <IconButton
                    onClick={() => gotoPage(pageCount - 1)}
                    isDisabled={!canNextPage}
                    icon={<ArrowRightIcon h={3} w={3} />}
                    ml={'5%'}
                  />
                </Tooltip>
              </Flex>
            </Flex>
          </VStack>
        </CardBody>
      </Card>
      <Card my="22px" overflowX={{ sm: 'scroll', xl: 'hidden' }}>
        <CardHeader p="12px 0px 28px 0px">
          <Flex direction="column" ps="5px">
            <Text fontSize="lg" color={textColor} fontWeight="bold" pb=".5rem">
              Marcas mas Vendidas
            </Text>
          </Flex>
        </CardHeader>
        <Flex ps={'10'}>
          <Table variant="simple" color={textColor}>
            <Thead>
              <Tr my=".8rem" ps="0px">
                <Th ps="0px" color="gray.400">
                  Marca
                </Th>
                <Th color="gray.400">Total Recaudado</Th>
                <Th color="gray.400">Porcentaje del Stock</Th>
              </Tr>
            </Thead>
            <Tbody>
              {dashboardTableData.map((row) => {
                return (
                  <DashboardTableRow
                    name={row.name}
                    logo={row.logo}
                    members={row.members}
                    budget={row.budget}
                    progression={row.progression}
                  />
                );
              })}
            </Tbody>
          </Table>
        </Flex>
      </Card>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          setLookUpData(null);
          onClose();
        }}
        size="6xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Detalle de Publicación</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <PostView postData={lookUpData} />
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                setLookUpData(null);
                onClose();
              }}>
              Cerrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}

export default Tables;
