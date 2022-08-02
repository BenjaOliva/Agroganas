// Chakra imports
import {
  Box,
  Button,
  Flex,
  Grid,
  Icon,
  SimpleGrid,
  Spacer,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from '@chakra-ui/react';
// Custom components
import Card from '../../components/Card/Card.js';
import CardBody from '../../components/Card/CardBody.js';
import CardHeader from '../../components/Card/CardHeader.js';
import LineChart from '../../components/Charts/LineChart';
import IconBox from '../../components/Icons/IconBox';
// Custom icons
import { CartIcon, DocumentIcon, GlobeIcon, WalletIcon } from '../../components/Icons/Icons.js';
import DashboardTableRow from '../../components/Tables/DashboardTableRow';
import TimelineRow from '../../components/Tables/TimelineRow';
import React from 'react';
// react icons
import { IoCheckmarkDoneCircleSharp } from 'react-icons/io5';
import { dashboardTableData, timelineData, sellsData } from '../../variables/general';

export default function Dashboard() {
  // Chakra Color Mode
  const iconTeal = useColorModeValue('teal.300', 'teal.300');
  const iconBoxInside = useColorModeValue('white', 'white');
  const textColor = useColorModeValue('gray.700', 'white');

  return (
    <Flex flexDirection="column" pt={{ base: '120px', md: '75px' }}>
      <SimpleGrid columns={{ sm: 1, md: 2, xl: 4 }} spacing="24px">
        <Card minH="83px">
          <CardBody>
            <Flex flexDirection="row" align="center" justify="center" w="100%">
              <Stat me="auto">
                <StatLabel fontSize="sm" color="gray.400" fontWeight="bold" pb=".1rem">
                  Dinero Facturado
                </StatLabel>
                <Flex>
                  <StatNumber fontSize="lg" color={textColor}>
                    $53.235
                  </StatNumber>
                  <StatHelpText
                    alignSelf="flex-end"
                    justifySelf="flex-end"
                    m="0px"
                    color="green.400"
                    fontWeight="bold"
                    ps="3px"
                    fontSize="md">
                    +55%
                  </StatHelpText>
                </Flex>
              </Stat>
              <IconBox h={'45px'} w={'45px'} bg={iconTeal}>
                <WalletIcon h={'24px'} w={'24px'} color={iconBoxInside} />
              </IconBox>
            </Flex>
          </CardBody>
        </Card>
        <Card minH="83px">
          <CardBody>
            <Flex flexDirection="row" align="center" justify="center" w="100%">
              <Stat me="auto">
                <StatLabel fontSize="sm" color="gray.400" fontWeight="bold" pb=".1rem">
                  Dinero Pendiente
                </StatLabel>
                <Flex>
                  <StatNumber fontSize="lg" color={textColor}>
                    $2.310
                  </StatNumber>
                  <StatHelpText
                    alignSelf="flex-end"
                    justifySelf="flex-end"
                    m="0px"
                    color="green.400"
                    fontWeight="bold"
                    ps="3px"
                    fontSize="md">
                    +5%
                  </StatHelpText>
                </Flex>
              </Stat>
              <IconBox h={'45px'} w={'45px'} bg={iconTeal}>
                <GlobeIcon h={'24px'} w={'24px'} color={iconBoxInside} />
              </IconBox>
            </Flex>
          </CardBody>
        </Card>
        <Card minH="83px">
          <CardBody>
            <Flex flexDirection="row" align="center" justify="center" w="100%">
              <Stat>
                <StatLabel fontSize="sm" color="gray.400" fontWeight="bold" pb=".1rem">
                  Ventas
                </StatLabel>
                <Flex>
                  <StatNumber fontSize="lg" color={textColor}>
                    122
                  </StatNumber>
                  <StatHelpText
                    alignSelf="flex-end"
                    justifySelf="flex-end"
                    m="0px"
                    color="green.500"
                    fontWeight="bold"
                    ps="3px"
                    fontSize="md">
                    +14%
                  </StatHelpText>
                </Flex>
              </Stat>
              <Spacer />
              <IconBox h={'45px'} w={'45px'} bg={iconTeal}>
                <DocumentIcon h={'24px'} w={'24px'} color={iconBoxInside} />
              </IconBox>
            </Flex>
          </CardBody>
        </Card>
        <Card minH="83px">
          <CardBody>
            <Flex flexDirection="row" align="center" justify="center" w="100%">
              <Stat me="auto">
                <StatLabel fontSize="sm" color="gray.400" fontWeight="bold" pb=".1rem">
                  Ventas Totales
                </StatLabel>
                <Flex>
                  <StatNumber fontSize="lg" color={textColor} fontWeight="bold">
                    2.866
                  </StatNumber>
                </Flex>
              </Stat>
              <IconBox h={'45px'} w={'45px'} bg={iconTeal}>
                <CartIcon h={'24px'} w={'24px'} color={iconBoxInside} />
              </IconBox>
            </Flex>
          </CardBody>
        </Card>
      </SimpleGrid>
      <Grid
        templateColumns={{ sm: '1fr', lg: '1.3fr 1.7fr' }}
        templateRows={{ sm: 'repeat(2, 1fr)', lg: '1fr' }}
        mt={10}
        gap="24px"
        mb={{ lg: '26px' }}>
        <Card maxH="100%">
          <CardHeader p="22px 0px 35px 14px">
            <Flex direction="column">
              <Text fontSize="lg" color={textColor} fontWeight="bold" pb=".5rem">
                Ordenes de Venta
              </Text>
              <Text fontSize="sm" color="gray.400" fontWeight="normal">
                <Text fontWeight="bold" as="span" color="teal.300">
                  +32%
                </Text>{' '}
                este mes.
              </Text>
            </Flex>
          </CardHeader>
          <CardBody ps="25px" pe="0px" position="relative">
            <Flex direction="column">
              {sellsData.map((row, index, arr) => {
                return (
                  <TimelineRow
                    logo={row.logo}
                    title={row.title}
                    date={'Cantidad: ' + row.date}
                    color={row.color}
                    index={index}
                    arrLength={arr.length}
                  />
                );
              })}
            </Flex>
          </CardBody>
        </Card>
        <Card p="28px 10px 16px 0px" mb={{ sm: '26px', lg: '0px' }}>
          <CardHeader mb="20px" pl="22px">
            <Flex direction="column" alignSelf="flex-start">
              <Text fontSize="lg" color={textColor} fontWeight="bold" mb="6px">
                Resumen de ventas
              </Text>
              <Text fontSize="md" fontWeight="medium" color="gray.400">
                <Text as="span" color="green.400" fontWeight="bold">
                  (+5%) mas
                </Text>{' '}
                en 2022
              </Text>
            </Flex>
          </CardHeader>
          <Box w="100%" h={{ sm: '300px' }} ps="8px">
            <LineChart />
          </Box>
        </Card>
      </Grid>
      <Grid
        templateColumns={{ sm: '1fr', md: '1fr 1fr', lg: '2fr 1fr' }}
        templateRows={{ sm: '1fr auto', md: '1fr', lg: '1fr' }}
        gap="24px">
        <Card overflowX={{ sm: 'scroll', xl: 'hidden' }}>
          <CardHeader p="12px 0px 28px 0px">
            <Flex direction="column" ps="5px">
              <Text fontSize="lg" color={textColor} fontWeight="bold" pb=".5rem">
                Marcas mas Vendidas
              </Text>
              <Flex align="center" hidden>
                <Icon as={IoCheckmarkDoneCircleSharp} color="teal.300" w={4} h={4} pe="3px" />
                <Text fontSize="sm" color="gray.400" fontWeight="normal">
                  <Text fontWeight="bold" as="span">
                    30 done
                  </Text>{' '}
                  this month.
                </Text>
              </Flex>
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
        <Card>
          <CardHeader p="22px 0px 35px 14px">
            <Flex direction="column">
              <Text fontSize="lg" color={textColor} fontWeight="bold" pb=".5rem">
                Accesos Directos
              </Text>
            </Flex>
          </CardHeader>
          <CardBody ps="20px" pe="0px" position="relative">
            <Flex direction="column">
              {timelineData.map((row, index, arr) => {
                return (
                  <Button mt={5} key={index + '-action'}>
                    Accion {index + 1}
                  </Button>
                );
              })}
            </Flex>
          </CardBody>
        </Card>
      </Grid>
    </Flex>
  );
}
