import CssBaseline from "@mui/material/CssBaseline"
import "@rainbow-me/rainbowkit/styles.css"
import { ThemeProvider } from "@mui/material/styles"
import theme from "theme"
import { RainbowKitProvider, getDefaultWallets, midnightTheme, Theme, darkTheme  } from "@rainbow-me/rainbowkit"
import { chain, configureChains, createClient, WagmiConfig } from "wagmi"
import { infuraProvider } from "wagmi/providers/infura"
import { publicProvider } from "wagmi/providers/public"
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client"
import { GRAPHQL_URL, INFURA_KEY, EXPECTED_CHAIN_ID, ALCH_KEY } from "config"
import { alchemyProvider } from 'wagmi/providers/alchemy'
const myCustomTheme: Theme = {
  blurs: {
   
    modalOverlay: 'small',
  },
  colors: {
    accentColor: '#b1841d',
    accentColorForeground: '#ffffff',
    actionButtonBorder: '#b1841d',
    actionButtonBorderMobile: '#b1841d',
    actionButtonSecondaryBackground: '#232333',
    closeButton: '#d0112b',
    closeButtonBackground: '#232333',
    connectButtonBackground: '#242424',
    connectButtonBackgroundError: '#d0112b',
    connectButtonInnerBackground: '#232333',
    connectButtonText: '#ffffff',
    connectButtonTextError: '#d0112b',
    connectionIndicator: '#b1841d',
    downloadBottomCardBackground: '#232333',
    downloadTopCardBackground: '#b1841d',
    error: '#d0112b',
    generalBorder: '#b1841d',
    generalBorderDim: '#b1841d',
    menuItemBackground: '#232333',
    modalBackdrop: '...',
    modalBackground: '#232333',
    modalBorder: '#b1841d',
    modalText: '#ffffff',
    modalTextDim: '#b1841d',
    modalTextSecondary: '#ffffff',
    profileAction: '#b1841d',
    profileActionHover: '#b1841d',
    profileForeground: '#232333',
    selectedOptionBorder: '#b1841d',
    standby: '#b1841d',
  },
  fonts: {
    body: 'brandon-grotesque',
  },
  radii: {
    actionButton: '...',
    connectButton: '...',
    menuButton: '...',
    modal: '...',
    modalMobile: '...',
  },
  shadows: {
    connectButton: '...',
    dialog: '...',
    profileDetailsAction: '...',
    selectedOption: '...',
    selectedWallet: '...',
    walletLogo: '...',
  },
  
};

const client = new ApolloClient({
  uri: GRAPHQL_URL,
  cache: new InMemoryCache()
})

// Defaults to goerli testing network if mainnet is not set
const expectedChains = EXPECTED_CHAIN_ID === 1 ? [chain.mainnet] : [chain.sepolia]
const initialChain = EXPECTED_CHAIN_ID === 1 ? chain.mainnet : chain.sepolia

const { chains, provider, webSocketProvider } = configureChains(
  expectedChains,
  [
    infuraProvider({apiKey: INFURA_KEY, priority: 0}),
    alchemyProvider({ apiKey:ALCH_KEY, priority: 1 }),
    publicProvider({priority: 2})
  ]
)

const { connectors } = getDefaultWallets({
  appName: "Muhammad Ali NFT Allowlist", 
  chains
})

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider
})

interface Props {
  children: React.ReactNode
}

const AppProvider = ({children}:Props) => {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
         coolMode
         chains={chains}
         modalSize="compact"
         initialChain={initialChain}
         theme={darkTheme({
          overlayBlur: 'large',
        })}>
        <ApolloProvider client={client}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </ApolloProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  )
}

export default AppProvider