import "@/styles/globals.css";
import type { AppProps } from "next/app";
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';

import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";
import {  wagmiConfig } from "@/utils/wagmi";
import Header from '@/components/header'
import Order from "@/components/order";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return <WagmiProvider config={wagmiConfig}>
    <QueryClientProvider client={queryClient}>
      <RainbowKitProvider>
        <Header />
        <Order />
        <Component {...pageProps} />
      </RainbowKitProvider>
    </QueryClientProvider>
  </WagmiProvider>
}
