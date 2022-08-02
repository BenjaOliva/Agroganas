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
} from '@chakra-ui/react';
// Custom components
import Card from '../../components/Card/Card.js';
import CardHeader from '../../components/Card/CardHeader.js';
import CardBody from '../../components/Card/CardBody.js';
import { dashboardTableData } from '../../variables/general';
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import { useTable, useSortBy, useGlobalFilter, useAsyncDebounce, usePagination } from 'react-table';
import { TableActions } from '../../components/Tables/TableActions';
import { FaTrash } from 'react-icons/fa';
import Pagination from './../../components/Tables/Pagination';
import DashboardTableRow from '../../components/Tables/DashboardTableRow';

function Tables() {
  const textColor = useColorModeValue('gray.700', 'white');
  const [search, setSearch] = useState('');

  const handleSearch = useAsyncDebounce((e) => {
    setSearch(e.target.value || undefined);
  }, 1500);

  useEffect(() => {
    console.log('Search: ', data);
  }, [search]);

  const items = React.useMemo(
    () => [
      {
        id: 'SKU-123456',
        title: 'Producto 1',
        brand: 'Nike',
        stock: 148,
        price: 1256.33,
        status: true,
      },
      {
        id: 'SKU-265489',
        title: 'Producto 2',
        brand: 'Nike',
        stock: 73,
        price: 967.33,
        status: true,
      },
      {
        id: 'SKU-254788',
        title: 'Producto 3',
        brand: 'Nike',
        stock: 148,
        price: 1256.33,
        status: true,
      },
      {
        id: 'SKU-987456',
        title: 'Producto 4',
        brand: 'Topper',
        stock: 52,
        price: 885.54,
        status: false,
      },
      {
        id: 'SKU-254788',
        title: 'Producto 5',
        brand: 'Nike',
        stock: 148,
        price: 1256.33,
        status: true,
      },
      {
        id: 'SKU-987456',
        title: 'Producto 6',
        brand: 'Topper',
        stock: 52,
        price: 885.54,
        status: false,
      },
      {
        id: 'SKU-254788',
        title: 'Producto 7',
        brand: 'Nike',
        stock: 148,
        price: 1256.33,
        status: true,
      },
      {
        id: 'SKU-987456',
        title: 'Producto 8',
        brand: 'Topper',
        stock: 52,
        price: 885.54,
        status: false,
      },
      {
        id: 'SKU-254788',
        title: 'Producto 9',
        brand: 'Nike',
        stock: 148,
        price: 1256.33,
        status: true,
      },
      {
        id: 'SKU-987456',
        title: 'Producto 10',
        brand: 'Topper',
        stock: 52,
        price: 885.54,
        status: false,
      },
      {
        id: 'SKU-254788',
        title: 'Producto 11',
        brand: 'Nike',
        stock: 148,
        price: 1256.33,
        status: true,
      },
      {
        id: 'SKU-987456',
        title: 'Producto 12',
        brand: 'Topper',
        stock: 52,
        price: 885.54,
        status: false,
      },
      {
        id: 'SKU-254788',
        title: 'Producto 13',
        brand: 'Nike',
        stock: 148,
        price: 1256.33,
        status: true,
      },
      {
        id: 'SKU-987456',
        title: 'Producto 14',
        brand: 'Topper',
        stock: 52,
        price: 885.54,
        status: false,
      },
      {
        id: 'SKU-987456',
        title: 'Producto 15',
        brand: 'Topper',
        stock: 52,
        price: 885.54,
        status: false,
      },
      {
        id: 'SKU-987456',
        title: 'Producto 16',
        brand: 'Topper',
        stock: 52,
        price: 885.54,
        status: false,
      },
      {
        id: 'SKU-987456',
        title: 'Producto 17',
        brand: 'Topper',
        stock: 52,
        price: 885.54,
        status: false,
      },
      {
        id: 'SKU-987456',
        title: 'Producto 18',
        brand: 'Topper',
        stock: 52,
        price: 885.54,
        status: false,
      },
      {
        id: 'SKU-987456',
        title: 'Producto 19',
        brand: 'Topper',
        stock: 52,
        price: 885.54,
        status: false,
      },
    ],
    []
  );

  const [data, setData] = useState(items);

  const columns = React.useMemo(
    () => [
      {
        Header: 'SKU (ID)',
        accessor: 'id',
      },
      {
        Header: 'Titulo',
        accessor: 'title',
      },
      {
        Header: 'Marca',
        accessor: 'brand',
      },
      {
        Header: 'Stock',
        accessor: 'stock',
        isNumeric: true,
      },
      {
        Header: 'Precio',
        accessor: 'price',
        isNumeric: true,
      },
      {
        Header: 'Estado',
        accessor: 'status',
        Cell: ({
          row: {
            original: { status },
          },
        }) => (
          <Badge colorScheme={status ? 'green' : 'red'} borderRadius="5px">
            {status ? 'Activo' : 'Oculto'}
          </Badge>
        ),
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
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable({ columns, data }, useGlobalFilter, useSortBy, usePagination);

  return (
    <Flex direction="column" pt={{ base: '120px', md: '75px' }}>
      <Card overflowX={{ sm: 'scroll', xl: 'hidden' }}>
        <CardHeader p="6px 0px 22px 0px" w="100%">
          <SimpleGrid columns={1} spacing={5} w="100%">
            <Text fontSize="xl" color={textColor} fontWeight="bold">
              Lista de Productos
            </Text>
            <TableActions handleSearch={handleSearch} />
          </SimpleGrid>
        </CardHeader>
        <CardBody>
          <Table {...getTableProps()}>
            <TableCaption>
              <Pagination />
            </TableCaption>
            <Thead>
              {headerGroups.map((headerGroup) => (
                <Tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <Th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      isNumeric={column.isNumeric}>
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
            <Tbody {...getTableBodyProps()}>
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
