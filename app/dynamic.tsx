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
        environmentId: 'db04d673-4e35-4fdb-a1cf-8d59c82f001f',
        walletConnectorExtensions: [EthersExtension],
        walletConnectors: [EthereumWalletConnectors, StarknetWalletConnectors],
      }}
    >
      <DynamicWidget />
    </DynamicContextProvider>
  )
}
