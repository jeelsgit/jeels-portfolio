// styles/theme.js
import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

// --- GitHub Specific Design Tokens ---
const colors = {
  githubLight: {
    bg: '#ffffff',
    headerBg: '#f6f8fa', // Specified but overridden for Header component
    sidebarBg: '#f6f8fa',
    cardBg: '#ffffff',
    text: '#24292f',
    textSecondary: '#57606a',
    border: '#d0d7de',
    link: '#0969da',
    linkHover: '#0969da',
    accent: '#0969da',
    accentHover: '#0a5cc7',
    activeItem: '#0969da',
    activeBg: 'rgba(9, 105, 218, 0.1)',
    buttonText: '#ffffff',
    success: '#1a7f37',
    warning: '#9a6700',
    error: '#cf222e',
    codeBg: '#f6f8fa',
    shadow: 'rgba(0, 0, 0, 0.12)',
    hoverShadow: 'rgba(0, 0, 0, 0.15)',
    buttonSecondaryHoverBg: 'rgba(208, 215, 222, 0.5)',
  },
  githubDark: {
    bg: '#0d1117',
    headerBg: '#161b22', // Specified but overridden for Header component
    sidebarBg: '#161b22',
    cardBg: '#161b22',
    text: '#c9d1d9',
    textSecondary: '#8b949e',
    border: '#30363d',
    link: '#58a6ff',
    linkHover: '#58a6ff',
    accent: '#238636', // Green primary button in dark
    accentHover: '#2ea043',
    activeItem: '#58a6ff',
    activeBg: 'rgba(88, 166, 255, 0.1)',
    buttonText: '#ffffff',
    success: '#238636',
    warning: '#d29922',
    error: '#f85149',
    codeBg: '#161b22',
    shadow: 'rgba(0, 0, 0, 0.1)',
    hoverShadow: 'rgba(0, 0, 0, 0.15)',
    buttonSecondaryHoverBg: 'rgba(48, 54, 61, 0.5)',
  },
  brand: { /* ... your previous brand colors ... */ },
};

// --- Typography ---
const fonts = {
  body: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
  heading: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
  mono: 'ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, Liberation Mono, monospace',
};

const fontSizes = {
  xs: '0.75rem',   // 12px
  sm: '0.875rem',  // 14px
  md: '1rem',     // 16px
  lg: '1.125rem', // 18px
  xl: '1.25rem',  // 20px
  '2xl': '1.5rem',  // 24px
  '3xl': '1.875rem',// 30px
  '4xl': '2rem',    // 32px
};

const lineHeights = {
  base: 1.5,
  short: 1.25,
  tall: 1.75,
  code: 1.45,
};

// --- Base Styles & Overrides ---
const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const styles = {
  global: (props) => ({
    body: {
      bg: mode('githubLight.bg', 'githubDark.bg')(props),
      color: mode('githubLight.text', 'githubDark.text')(props),
      fontFamily: 'body',
      fontSize: 'sm',
      lineHeight: 'base',
      transitionProperty: 'background-color',
      transitionDuration: '0.2s',
      transitionTimingFunction: 'ease-in-out',
      overflow: 'hidden',
      // --- Custom Cursor (Uncomment to enable) ---
      // Make sure you have cursor.png in /public
      cursor: 'url(/cursor.png), auto',
      // ------------------------------------------
    },
    // --- Custom Cursor Fallback/Overrides (Uncomment if using custom body cursor) ---
    'a, button, [role="button"]': {
       cursor: 'pointer', // Ensure interactive elements use pointer
    },
    // -----------------------------------------------------------------------------
    '*::placeholder': {
      color: mode('githubLight.textSecondary', 'githubDark.textSecondary')(props),
    },
    '*, *::before, &::after': {
      borderColor: mode('githubLight.border', 'githubDark.border')(props),
      wordWrap: 'break-word',
    },
    a: {
        color: mode('githubLight.link', 'githubDark.link')(props),
        textDecoration: 'none',
        _hover: {
            textDecoration: 'underline',
        }
    },
    'code, kbd, samp, pre': {
        fontFamily: 'mono',
        fontSize: '85%',
        lineHeight: 'code',
    },
    pre: {
        bg: mode('githubLight.codeBg', 'githubDark.codeBg')(props),
        border: '1px solid',
        borderColor: 'inherit',
        borderRadius: '6px',
        padding: '16px',
        overflowX: 'auto',
    },
    code: {
        bg: mode('rgba(175,184,193,0.2)', 'rgba(110,118,129,0.2)')(props),
        padding: '0.2em 0.4em',
        margin: 0,
        borderRadius: '6px',
    },
    'pre code': {
        background: 'none',
        padding: 0,
        margin: 0,
        borderRadius: 0,
        border: 'none',
        fontSize: '100%',
    }
  }),
};

// --- Component Styles ---
const components = {
  // Heading, Text, Link, Button, Card, Tag styles remain the same as the previous 'specific GitHub theme' version
  Heading: { /* ... */ },
  Text: { /* ... */ },
  Link: { /* ... */ },
  Button: { /* ... */ },
  Card: { /* ... */ },
  Tag: { /* ... */ },
};

// --- Final Theme ---
const theme = extendTheme({
  config,
  colors,
  fonts,
  fontSizes,
  lineHeights,
  styles,
  components,
});

export default theme;