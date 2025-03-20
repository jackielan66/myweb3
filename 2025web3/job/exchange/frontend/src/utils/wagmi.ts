import {
    getDefaultConfig,
    RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import {
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
    hardhat
} from 'wagmi/chains';

export const wagmiConfig = getDefaultConfig({
    appName: 'My RainbowKit App',
    projectId: 'YOUR_PROJECT_ID',
    chains: [hardhat, mainnet, polygon, optimism, arbitrum, base],
    ssr: true, // If your dApp uses server side rendering (SSR)
});

