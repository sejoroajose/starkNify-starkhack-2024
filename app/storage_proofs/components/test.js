const fetchWalletBalance = async (address, block) => {
  setLoading(true)
  setError('')
  try {
    const response = await fetch(
      'https://api.herodotus.cloud/submit-batch-query?apiKey=90a25974-6771-415f-8417-39f716db1c93',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
        },
        body: JSON.stringify({
          destinationChainId: 'SN_SEPOLIA',
          fee: '0',
          data: {
            11155111: {
              [`block:${block}`]: {
                accounts: {
                  [address]: {
                    props: ['BALANCE'],
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
        }),
      }
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    console.log('Initial response data:', data) // Print the initial response

    const batchQueryId = data.internalId
    console.log('Batch Query ID:', batchQueryId) // Print the batch query ID

    let queryStatus = ''
    do {
      await new Promise((res) => setTimeout(res, 5000))
      const statusResponse = await fetch(
        `https://api.herodotus.cloud/batch-queries/${batchQueryId}?apiKey=90a25974-6771-415f-8417-39f716db1c93`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            accept: 'application/json',
          },
        }
      )

      if (!statusResponse.ok) {
        throw new Error(`HTTP error! status: ${statusResponse.status}`)
      }

      const statusData = await statusResponse.json()
      console.log('Status response data:', statusData) // Print the status response data
      queryStatus = statusData.queryStatus

      if (queryStatus === 'DONE') {
        const balanceData =
          statusData.results['11155111'][`block:${block}`].accounts[address]
            .BALANCE
        console.log('Balance Data:', balanceData) // Print the balance data
        setBalance(balanceData)
      }
    } while (queryStatus !== 'DONE')
  } catch (err) {
    console.error('Error:', err) // Print any errors that occur
    setError('Failed to fetch balance. Please try again.')
  } finally {
    setLoading(false)
  }
}
