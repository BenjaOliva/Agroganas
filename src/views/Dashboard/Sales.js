import React, { useState } from 'react';
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
  TableCaption,
  HStack,
  Icon,
} from '@chakra-ui/react';
// Custom components
import Card from '../../components/Card/Card.js';
import CardBody from '../../components/Card/CardBody.js';
import CardHeader from '../../components/Card/CardHeader.js';
import IconBox from '../../components/Icons/IconBox';
import { InfoIcon, TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import { useTable, useSortBy, useGlobalFilter, useAsyncDebounce, usePagination } from 'react-table';
import { TableActions } from '../../components/Tables/TableActions';
import Pagination from './../../components/Tables/Pagination';
import { FaCashRegister, FaDollarSign, FaFileInvoiceDollar } from 'react-icons/fa';
import { Separator } from './../../components/Separator/Separator';

function Sales() {
  const textColor = useColorModeValue('gray.700', 'white');
  const [search, setSearch] = useState('');

  const handleSearch = useAsyncDebounce((e) => {
    setSearch(e.target.value || undefined);
  }, 1500);

  function setDateTest() {
    let date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    if (month < 10) {
      return `${day}-0${month}-${year}`;
    } else {
      return `${day}-${month}-${year}`;
    }
  }

  const items = React.useMemo(
    () => [
      {
        id: 'ID-2546',
        title: 'testing2022@gmail.com',
        brand: '+54 9 3513325123',
        stock: setDateTest(),
        price: 1256.33,
        status: true,
      },
      {
        id: 'ID-2547',
        title: 'testing2022@gmail.com',
        brand: '+54 9 3513325123',
        stock: setDateTest(),
        price: 1256.33,
        status: true,
      },
      {
        id: 'ID-2548',
        title: 'testing2022@gmail.com',
        brand: '+54 9 3513325123',
        stock: setDateTest(),
        price: 1256.33,
        status: true,
      },
      {
        id: 'ID-2549',
        title: 'testing2022@gmail.com',
        brand: '+54 9 3513325123',
        stock: setDateTest(),
        price: 1256.33,
        status: true,
      },
      {
        id: 'ID-2550',
        title: 'testing2022@gmail.com',
        brand: '+54 9 3513325123',
        stock: setDateTest(),
        price: 1256.33,
        status: true,
      },
    ],
    []
  );

  const [data, setData] = useState(items);

  const columns = React.useMemo(
    () => [
      {
        Header: 'ID Venta',
        accessor: 'id',
      },
      {
        Header: 'Mail',
        accessor: 'title',
      },
      {
        Header: 'Telefono',
        accessor: 'brand',
      },
      {
        Header: 'Fecha',
        accessor: 'stock',
        isNumeric: true,
      },
      {
        Header: 'Monto',
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
            {status ? 'Completado' : 'Rechazado'}
          </Badge>
        ),
      },
      {
        Header: '',
        accessor: 'action',
        Cell: () => (
          <IconButton colorScheme={'blue'} aria-label="Search database" icon={<InfoIcon />} />
        ),
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, prepareRow, page } = useTable(
    { columns, data },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  return (
    <Flex direction="column" pt={{ base: '120px', md: '75px' }}>
      <HStack mb={5} spacing={5}>
        <Card p="16px" display="flex" align="center" justify="center">
          <CardBody>
            <Flex direction="column" align="center" w="100%" py="14px">
              <IconBox h={'60px'} w={'60px'} bg={'purple.400'}>
                <Icon h={'24px'} w={'24px'} color="white" as={FaFileInvoiceDollar} />
              </IconBox>
              <Flex
                direction="column"
                m="14px"
                justify="center"
                textAlign="center"
                align="center"
                w="100%">
                <Text fontSize="md" color={textColor} fontWeight="bold">
                  Ventas Abiertas
                </Text>
                <Text mb="24px" fontSize="xs" color="gray.400" fontWeight="semibold">
                  Ventas con pago realizado, pendiente de entrega al cliente
                </Text>
                <Separator />
              </Flex>
              <Text fontSize="lg" color={textColor} fontWeight="bold">
                17
              </Text>
            </Flex>
          </CardBody>
        </Card>
        <Card p="16px" display="flex" align="center" justify="center">
          <CardBody>
            <Flex direction="column" align="center" w="100%" py="14px">
              <IconBox h={'60px'} w={'60px'} bg={'green.700'}>
                <Icon h={'24px'} w={'24px'} color="white" as={FaDollarSign} />
              </IconBox>
              <Flex
                direction="column"
                m="14px"
                justify="center"
                textAlign="center"
                align="center"
                w="100%">
                <Text fontSize="md" color={textColor} fontWeight="bold">
                  Ventas Cerradas
                </Text>
                <Text mb="24px" fontSize="xs" color="gray.400" fontWeight="semibold">
                  Ventas concretadas con exito
                </Text>
                <Separator />
              </Flex>
              <Text fontSize="lg" color={textColor} fontWeight="bold">
                3
              </Text>
            </Flex>
          </CardBody>
        </Card>
        <Card p="16px" display="flex" align="center" justify="center">
          <CardBody>
            <Flex direction="column" align="center" w="100%" py="14px">
              <IconBox h={'60px'} w={'60px'} bg={'blue.800'}>
                <Icon h={'24px'} w={'24px'} color="white" as={FaCashRegister} />
              </IconBox>
              <Flex
                direction="column"
                m="14px"
                justify="center"
                textAlign="center"
                align="center"
                w="100%">
                <Text fontSize="md" color={textColor} fontWeight="bold">
                  Ventas Totales
                </Text>
                <Text mb="24px" fontSize="xs" color="gray.400" fontWeight="semibold">
                  Total de ventas
                </Text>
                <Separator />
              </Flex>
              <Text fontSize="lg" color={textColor} fontWeight="bold">
                20
              </Text>
            </Flex>
          </CardBody>
        </Card>
      </HStack>
      <Card overflowX={{ sm: 'scroll', xl: 'hidden' }}>
        <CardHeader p="6px 0px 22px 0px" w="100%">
          <SimpleGrid columns={1} spacing={5} w="100%">
            <Text fontSize="xl" color={textColor} fontWeight="bold">
              Listado de Ventas
            </Text>
            <TableActions handleSearch={handleSearch} isSells={true} />
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
    </Flex>
  );
}

export default Sales;
