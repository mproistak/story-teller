import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { ChakraProvider } from '@chakra-ui/react';

import Layout from '@/src/layout/Layout';
import theme from '@/src/theme';
import '@/src/styles/globals.css';
import '@/src/styles/index.scss';
import '@/src/styles/submarine.scss';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <Component {...pageProps} key={router.route} />
      </Layout>
    </ChakraProvider>
  );
}

export default MyApp;
