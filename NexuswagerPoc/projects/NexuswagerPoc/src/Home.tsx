// src/components/Home.tsx
import { useWallet } from '@txnlab/use-wallet-react'
import React, { useState } from 'react'
import ConnectWallet from './components/ConnectWallet'
import NFTmint from './components/NFTmint'
import Transact from './components/Transact'

const Home: React.FC = () => {
  const [openWalletModal, setOpenWalletModal] = useState(false)
  const [openDemoModal, setOpenDemoModal] = useState(false)
  const [openNFTModal, setOpenNFTModal] = useState(false)
  const [claimed, setClaimed] = useState(false)

  const { activeAddress } = useWallet()

  // Simple handler for free coins
  const claimFreeCoins = () => {
    setClaimed(true)
    setTimeout(() => setClaimed(false), 4000) // hide after 4 seconds
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-black to-blue-950 p-6">
      {/* iPhone 13 frame */}
      <div className="relative bg-black rounded-[3rem] shadow-2xl w-[390px] h-[844px] flex items-center justify-center overflow-hidden border-[12px] border-gray-800">
        {/* Screen area */}
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-6 text-center bg-gradient-to-b from-black via-blue-950 to-black text-white font-sans">
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-6 bg-black rounded-b-2xl" />

          {/* Headline */}
          <h1 className="text-3xl font-extrabold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 drop-shadow-lg">
            Welcome to Nexuswager 🎮
          </h1>

          {/* Sub description */}
          <p className="mb-6 text-base font-medium text-gray-200 leading-relaxed px-2">
            Step into the{" "}
            <span className="text-blue-400 font-semibold">future of gaming</span>.  
            Play, connect, and win with{" "}
            <span className="text-pink-400 font-semibold">virtual currency</span>.
          </p>

          {/* Buttons */}
          <div className="flex flex-col gap-3 w-full px-6">
            <button
              onClick={() => setOpenWalletModal(true)}
              className="py-3 w-full rounded-xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg hover:scale-105 transition transform"
            >
              Connect Wallet
            </button>

            {activeAddress && (
              <>
                <button
                  onClick={() => setOpenDemoModal(true)}
                  className="py-3 w-full rounded-xl font-bold bg-gradient-to-r from-pink-500 to-purple-700 shadow-lg hover:scale-105 transition transform"
                >
                  Send Payment
                </button>

                <button
                  onClick={() => setOpenNFTModal(true)}
                  className="py-3 w-full rounded-xl font-bold bg-gradient-to-r from-indigo-500 to-blue-600 shadow-lg hover:scale-105 transition transform"
                >
                  Mint MasterPass NFT
                </button>
              </>
            )}

            {/* Free Nexuscoin Claim */}
            <button
              onClick={claimFreeCoins}
              className="py-3 w-full rounded-xl font-bold bg-gradient-to-r from-green-400 to-lime-500 shadow-lg hover:scale-105 transition transform"
            >
              Get Your Free Nexuscoin!!!
            </button>
          </div>

          {/* Success message */}
          {claimed && (
            <div className="mt-6 p-3 bg-green-500 text-black font-semibold rounded-lg shadow-lg">
              🎉 You've claimed your free coins!
            </div>
          )}

          {/* Modals */}
          <ConnectWallet openModal={openWalletModal} closeModal={() => setOpenWalletModal(false)} />
          <Transact openModal={openDemoModal} setModalState={setOpenDemoModal} />
          <NFTmint openModal={openNFTModal} setModalState={setOpenNFTModal} />
        </div>
      </div>
    </div>
  )
}

export default Home
