'use client'
import React, { useState, FormEvent } from 'react'
import axios from 'axios'

interface ResultData {
  [key: string]: any
}

const BalanceVerifier: React.FC = () => {
  const [address, setAddress] = useState<string>('')
  const [blockNumber, setBlockNumber] = useState<string>('')
  const [chainId, setChainId] = useState<string>('11155111')
  const [result, setResult] = useState<ResultData | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const apiKey = '90a25974-6771-415f-8417-39f716db1c93'
    const apiUrl = `https://api.herodotus.cloud/submit-batch-query?apiKey=${apiKey}`

    const data = {
      destinationChainId: 'SN_SEPOLIA',
      fee: '0',
      data: {
        [chainId]: {
          [`block:${blockNumber}`]: {
            accounts: {
              [address]: {
                props: ['BALANCE', 'NONCE', 'STORAGE_ROOT'],
                slots: [],
              },
            },
          },
        },
      },
      webhook: {
        url: 'https://webhook.site/e0e15ccd-50f0-42be-9589-d9fd97d550d8',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    }

    try {
      const response = await axios.post(apiUrl, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      setResult(response.data)
      console.log(response.data)
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response) {
          setError(
            `Error: ${err.response.data.error || err.response.statusText}`
          )
        } else if (err.request) {
          setError('Error: No response received from the server')
        } else {
          setError(`Error: ${err.message}`)
        }
      } else {
        setError(`Error: ${(err as Error).message}`)
      }
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <label htmlFor="address" className="font-medium">
            Wallet Address:
          </label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="p-2 border rounded"
            required
          />
          <label htmlFor="blockNumber" className="font-medium">
            Block Number:
          </label>
          <input
            type="number"
            id="blockNumber"
            value={blockNumber}
            onChange={(e) => setBlockNumber(e.target.value)}
            className="p-2 border rounded"
            required
          />
          <label htmlFor="chainId" className="font-medium">
            Chain:
          </label>
          <select
            id="chainId"
            value={chainId}
            onChange={(e) => setChainId(e.target.value)}
            className="p-2 border rounded"
            required
          >
            <option value="11155111">Sepolia N</option>
            <option value="1">Ethereum Mainnet</option>
            <option value="5">Goerli Testnet</option>
          </select>
          <button
            type="submit"
            className={`p-2 rounded bg-slate-900 text-white ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Submit'}
          </button>
        </form>

        {error && <p className="text-red-500 mt-4">Error: {error}</p>}

        {result && (
          <div className="mt-4">
            <h2 className="font-bold">Result:</h2>
            <pre className="bg-gray-200 p-2 rounded">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  )
}

export default BalanceVerifier
