import {
  Button,
  Flex,
  Heading,
  Link,
  Stack,
  Text,
  useColorModeValue as mode,
} from '@chakra-ui/react';
import * as React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { formatPrice } from './PriceTag';
import { useHistory } from 'react-router-dom';

const OrderSummaryItem = (props) => {
  const { label, value, children } = props;
  return (
    <Flex justify="space-between" fontSize="sm">
      <Text fontWeight="medium" color={mode('gray.600', 'gray.400')}>
        {label}
      </Text>
      {value ? <Text fontWeight="medium">{value}</Text> : children}
    </Flex>
  );
};

export const CartOrderSummary = (props) => {
  const navigate = useHistory();

  return (
    <Stack spacing="3" borderWidth="1px" rounded="lg" padding="3" width="full">
      <Heading size="md">Resumen de Compra</Heading>

      <Stack spacing="2">
        <OrderSummaryItem label="Subtotal" value={formatPrice(597)} />
        <OrderSummaryItem label="Codigo de Descuento">
          <Link href="#" textDecor="underline">
            Agregar codigo de descuento
          </Link>
        </OrderSummaryItem>
        <Flex justify="space-between">
          <Text fontSize="lg" fontWeight="semibold">
            Total
          </Text>
          <Text fontSize="xl" fontWeight="extrabold">
            {formatPrice(597)}
          </Text>
        </Flex>
      </Stack>
      <Button
        colorScheme="blue"
        size="lg"
        fontSize="md"
        rightIcon={<FaArrowRight />}
        onClick={() => {
          navigate('/checkout');
          props.closeCheckout();
        }}>
        Revisar Compra
      </Button>
    </Stack>
  );
};
