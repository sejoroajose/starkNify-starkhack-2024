import Image from 'next/image'
import WalletConnect from '@/app/dynamic'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center relative">
      <div className="fixed top-4 right-4">
        <WalletConnect />
      </div>

      <div className="flex flex-col items-center justify-center">
        <p className="text-2xl font-bold">Welcome to Starknify</p>
        <p>YOu are welcome</p>
      </div>
    </main>
  )
}
