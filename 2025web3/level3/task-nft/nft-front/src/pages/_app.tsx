import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import type { AppProps } from 'next/app';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { RainbowKitProvider, darkTheme ,lightTheme} from '@rainbow-me/rainbowkit';

import { config } from '../wagmi';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Providers from '../Providers'

const client = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {



  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={client}>
        <Providers>
          <RainbowKitProvider 
             theme={{
              lightMode: lightTheme(),
              darkMode: darkTheme(),
            }}
          >
            <Component {...pageProps} />
            <ToastContainer position='top-center' />
          </RainbowKitProvider>
        </Providers>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default MyApp;
