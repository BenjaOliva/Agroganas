// Chakra Imports
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  Flex,
  Icon,
  Link,
  Switch,
  Text,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import GitHubButton from 'react-github-btn';
import { Separator } from '../Separator/Separator';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { FaTwitter, FaFacebook } from 'react-icons/fa';

export default function Configurator(props) {
  const { secondary, isOpen, onClose, fixed, ...rest } = props;
  const [switched, setSwitched] = useState(props.isChecked);

  const { colorMode, toggleColorMode } = useColorMode();
  // Chakra Color Mode
  let fixedDisplay = 'flex';
  if (props.secondary) {
    fixedDisplay = 'none';
  }

  let bgButton = useColorModeValue(
    'linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)',
    'white'
  );
  let colorButton = useColorModeValue('white', 'gray.700');
  const secondaryButtonBg = useColorModeValue('white', 'transparent');
  const secondaryButtonBorder = useColorModeValue('gray.700', 'white');
  const secondaryButtonColor = useColorModeValue('gray.700', 'white');
  const settingsRef = React.useRef();
  return (
    <>
      <Drawer
        isOpen={props.isOpen}
        onClose={props.onClose}
        placement={'right'}
        finalFocusRef={settingsRef}
        blockScrollOnMount={false}>
        <DrawerContent>
          <DrawerHeader pt="24px" px="24px">
            <DrawerCloseButton />
            <Text fontSize="xl" fontWeight="bold" mt="16px">
              Agroganás Admin Settings
            </Text>
            <Text fontSize="sm" mb="16px">
              Modifique su configuracion.
            </Text>
            <Separator />
          </DrawerHeader>
          <DrawerBody w="340px" ps="24px" pe="40px">
            <Flex flexDirection="column">
              <Box>
                <Text fontSize="md" fontWeight="600" mb={5}>
                  Barra de Navegacion Lateral
                </Text>
                <Flex>
                  <Button
                    w="50%"
                    p="8px 32px"
                    me="8px"
                    colorScheme="teal"
                    borderColor="teal.300"
                    color="teal.300"
                    variant="outline"
                    fontSize="xs"
                    onClick={props.onTransparent}>
                    Transparente
                  </Button>
                  <Button
                    type="submit"
                    bg="teal.300"
                    w="50%"
                    p="8px 32px"
                    mb={5}
                    _hover="teal.300"
                    color="white"
                    fontSize="xs"
                    onClick={props.onOpaque}>
                    Opaco
                  </Button>
                </Flex>
              </Box>
              <Box display={fixedDisplay} justifyContent="space-between " mb="16px">
                <Text fontSize="md" fontWeight="600" mb="4px">
                  Topbar Fija
                </Text>
                <Switch
                  colorScheme="teal"
                  isChecked={switched}
                  onChange={(event) => {
                    if (switched === true) {
                      props.onSwitch(false);
                      setSwitched(false);
                    } else {
                      props.onSwitch(true);
                      setSwitched(true);
                    }
                  }}
                />
              </Box>
              <Flex justifyContent="space-between" alignItems="center" mb="24px">
                <Text fontSize="md" fontWeight="600" mb="4px">
                  Estilo
                </Text>
                <Button onClick={toggleColorMode}>
                  Usar modo {colorMode === 'light' ? 'Oscuro' : 'Claro'}
                </Button>
              </Flex>

              <Separator />
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
Configurator.propTypes = {
  secondary: PropTypes.bool,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  fixed: PropTypes.bool,
};
