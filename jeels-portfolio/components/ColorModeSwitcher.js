// components/ColorModeSwitcher.js
import React from 'react';
import { useColorMode, IconButton } from '@chakra-ui/react';
import { FaMoon, FaSun } from 'react-icons/fa';

export const ColorModeSwitcher = (props) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const text = colorMode === 'light' ? 'Dark' : 'Light';
  const SwitchIcon = colorMode === 'light' ? FaMoon : FaSun;

  return (
    <IconButton
      size="md"
      fontSize="lg"
      aria-label={`Switch to ${text} mode`}
      variant="ghost"
      color="current"
      marginLeft="2"
      onClick={toggleColorMode}
      icon={<SwitchIcon />}
      {...props}
    />
  );
};