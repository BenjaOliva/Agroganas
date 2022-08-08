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
  TableCaption,
  TableContainer,
  Center,
} from '@chakra-ui/react';
// Custom components
import Card from '../../components/Card/Card.js';
import CardHeader from '../../components/Card/CardHeader.js';
import CardBody from '../../components/Card/CardBody.js';
import { dashboardTableData } from '../../variables/general';
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import { useTable, useSortBy, useGlobalFilter, usePagination, useFilters } from 'react-table';
import { TableActions } from '../../components/Tables/TableActions';
import { FaTrash } from 'react-icons/fa';
import Pagination from './../../components/Tables/Pagination';
import DashboardTableRow from '../../components/Tables/DashboardTableRow';

function Tables({ tableData }) {
  const textColor = useColorModeValue('gray.700', 'white');

  var items = [
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
      Imagen: 'https://via.placeholder.com/150',
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
      Imagen: 'https://via.placeholder.com/150',
      Propiedades: '',
      PrpiedadesTexto: 'Testing props',
      Publicante: 'Publicante Test',
      Provincia: 'Provincia Test',
      Localidad: 'Localidad Test',
    },
  ];

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
          console.log(status);

          return (
            <Center>
              <Badge colorScheme={status ? 'green' : 'red'} borderRadius="5px">
                {status ? 'Activo' : 'Oculto'}
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
              Edit
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

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    page,
    prepareRow,
    state,
    setGlobalFilter,
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
        <CardBody w="100%">
          <TableContainer>
            <Table {...getTableProps()} variant="simple">
              <TableCaption>
                <Pagination />
              </TableCaption>
              <Thead>
                {headerGroups.map((headerGroup) => (
                  <Tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => {
                      console.log('centerTitle: ', column.centerTitle ? 'center' : 'left');

                      return (
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
                      );
                    })}
                  </Tr>
                ))}
              </Thead>
              <Tbody {...getTableBodyProps()} bgColor={useColorModeValue('white', 'gray.800')}>
                {page.map((row) => {
                  prepareRow(row);
                  return (
                    <Tr {...row.getRowProps()}>
                      {row.cells.map((cell) => (
                        <Td {...cell.getCellProps()} isNumeric={cell.column.isNumeric}>
                          {cell.render('Cell')}
                        </Td>
                      ))}
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
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
    </Flex>
  );
}

export default Tables;
