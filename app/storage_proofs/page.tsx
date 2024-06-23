import BalanceVerifier from '@/app/storage_proofs/components/BalanceVerifier'

const HomePage = () => {
  return (
    <>
      <div className="text-gray-950 font-extrabold text-lg text-center mt-30">
        Chain Specific Data
      </div>
      <BalanceVerifier />
    </>
  )
}

export default HomePage
