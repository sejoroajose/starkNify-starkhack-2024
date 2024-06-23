import {
  DynamicContextProvider,
  DynamicWidget,
} from '@dynamic-labs/sdk-react-core'
import { EthersExtension } from '@dynamic-labs/ethers-v5'

import { EthereumWalletConnectors } from '@dynamic-labs/ethereum'
import { StarknetWalletConnectors } from '@dynamic-labs/starknet'

export default function WalletConnect() {
  return (
    <DynamicContextProvider
      settings={{
        environmentId: '537eea0e-0efe-45e4-a2c9-a4c03d17cecd',
        walletConnectorExtensions: [EthersExtension],
        walletConnectors: [EthereumWalletConnectors, StarknetWalletConnectors],
      }}
    >
      <DynamicWidget />
    </DynamicContextProvider>
  )
}
