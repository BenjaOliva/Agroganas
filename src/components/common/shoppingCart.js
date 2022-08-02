import React from 'react';
import {
  IconButton,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Heading,
  Flex,
  Stack,
} from '@chakra-ui/react';
import { FaShoppingCart } from 'react-icons/fa';
import { CartItem } from './../extra/Cart/CartItem';
import { CartOrderSummary } from './../extra/Cart/CartOrderSummary';
import { cartData } from './../extra/Cart/_data';

const ShoppingCartButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <IconButton
        variant="ghost"
        aria-label="Shopping Cart"
        size="lg"
        icon={<FaShoppingCart />}
        onClick={onOpen}
      />
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={'lg'}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <Heading fontSize="2xl" fontWeight="extrabold">
              Carrito de Compras (3 items)
            </Heading>
          </DrawerHeader>

          <DrawerBody>
            <Stack spacing="6">
              {cartData.map((item) => (
                <CartItem key={item.id} {...item} />
              ))}
            </Stack>
          </DrawerBody>

          <DrawerFooter>
            <Flex direction="column" align="center" flex="1">
              <CartOrderSummary closeCheckout={onClose} />
            </Flex>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default ShoppingCartButton;
