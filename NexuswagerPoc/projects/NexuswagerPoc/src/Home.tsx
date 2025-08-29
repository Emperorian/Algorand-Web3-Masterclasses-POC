// src/components/Home.tsx
import { useWallet } from '@txnlab/use-wallet-react'
import React, { useState } from 'react'
import ConnectWallet from './components/ConnectWallet'
import Transact from './components/Transact'

const Home: React.FC = () => {
  const [openWalletModal, setOpenWalletModal] = useState<boolean>(false)
  const [openDemoModal, setOpenDemoModal] = useState<boolean>(false)
  const [claimed, setClaimed] = useState<boolean>(false)
  const { activeAddress } = useWallet()

  const toggleWalletModal = () => setOpenWalletModal(!openWalletModal)
  const toggleDemoModal = () => setOpenDemoModal(!openDemoModal)

  const claimFreeCoins = () => {
    setClaimed(true)
    setTimeout(() => setClaimed(false), 4000) // hide after 4 seconds
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white relative">
      {/* gamer vibe background */}
      <div className="absolute inset-0 opacity-10 bg-[url('https://cdn-icons-png.flaticon.com/512/3135/3135715.png')] bg-repeat" />

      <div className="relative z-10 text-center p-8 bg-white/10 backdrop-blur-lg rounded-2xl shadow-lg max-w-lg">
        <h1 className="text-4xl font-extrabold mb-4 text-purple-200 drop-shadow">
          Welcome to <span className="text-blue-300">Nexuswager 🎮</span>
        </h1>
        <p className="mb-6 text-lg text-gray-200">
          Your ticket to join a global <span className="font-semibold text-purple-300">gaming community</span>  
          using virtual currency. Play, connect, and win together!
        </p>

        <div className="flex flex-col gap-3">
          {/* Connect Wallet */}
          <button
            data-test-id="connect-wallet"
            onClick={toggleWalletModal}
            className="btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
          >
            Connect Wallet
          </button>

          {/* Transactions */}
          {activeAddress && (
            <button
              data-test-id="transactions-demo"
              onClick={toggleDemoModal}
              className="btn bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg"
            >
              Send Payment
            </button>
          )}

          {/* Free Nexuscoin Claim */}
          <button
            onClick={claimFreeCoins}
            className="btn bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-bold py-2 px-4 rounded-lg"
          >
            Get Your Free Nexuscoin
          </button>

          {/* Success message */}
          {claimed && (
            <div className="mt-4 p-3 bg-green-500 text-white font-semibold rounded-lg">
              🎉 You've claimed your free coins!
            </div>
          )}
        </div>

        {/* Wallet + Transaction modals */}
        <ConnectWallet openModal={openWalletModal} closeModal={toggleWalletModal} />
        <Transact openModal={openDemoModal} setModalState={setOpenDemoModal} />
      </div>
    </div>
  )
}

export default Home
