// pages/_app.js
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../styles/theme'; // We will create this file next

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;