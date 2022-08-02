import React from 'react';
import { useColorMode, useColorModeValue, IconButton, Box, Button } from '@chakra-ui/react';
import { FaMoon, FaSun } from 'react-icons/fa';

export const ColorModeSwitcher = (props) => {
  const { toggleColorMode } = useColorMode();
  const text = useColorModeValue('dark', 'light');
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);

  return (
    <Box display={props.display}>
      <IconButton
        size="lg"
        fontSize="lg"
        aria-label={`Switch to ${text} mode`}
        color="current"
        marginLeft="2"
        onClick={toggleColorMode}
        icon={<SwitchIcon />}
        {...props}
      />
    </Box>
  );
};

export const ColorModeSwitcherMenuButton = (props) => {
  const { toggleColorMode } = useColorMode();
  const text = useColorModeValue('oscuro', 'claro');
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);

  return (
    <Button leftIcon={<SwitchIcon />} colorScheme="blue" variant="solid" onClick={toggleColorMode}>
      Cambiar a modo {text}
    </Button>
  );
};
