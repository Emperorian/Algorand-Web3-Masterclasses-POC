// src/components/NFTmint.tsx
import { AlgorandClient } from '@algorandfoundation/algokit-utils'
import { useWallet } from '@txnlab/use-wallet-react'
import { useSnackbar } from 'notistack'
import { useState } from 'react'
import { getAlgodConfigFromViteEnvironment } from '../utils/network/getAlgoClientConfigs'
import { sha512_256 } from 'js-sha512'

interface NFTmintInterface {
  openModal: boolean
  setModalState: (value: boolean) => void
}

const NFTmint = ({ openModal, setModalState }: NFTmintInterface) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [metadataUrl, setMetadataUrl] = useState<string>('')

  const algodConfig = getAlgodConfigFromViteEnvironment()
  const algorand = AlgorandClient.fromConfig({ algodConfig })

  const { enqueueSnackbar } = useSnackbar()
  const { transactionSigner, activeAddress } = useWallet()

  const handleMintNFT = async () => {
    setLoading(true)

    if (!transactionSigner || !activeAddress) {
      enqueueSnackbar('Please connect your wallet first', { variant: 'warning' })
      setLoading(false)
      return
    }

    if (!metadataUrl) {
      enqueueSnackbar('Please provide a metadata URL from Pinata/IPFS', { variant: 'warning' })
      setLoading(false)
      return
    }

    try {
      enqueueSnackbar('Minting your NFT, please wait...', { variant: 'info' })

      const metadataHash = new Uint8Array(Buffer.from(sha512_256.digest(metadataUrl)))

      const createNFTResult = await algorand.send.assetCreate({
        sender: activeAddress,
        signer: transactionSigner,
        total: 1n,
        decimals: 0,
        assetName: 'Nexuscoins Ticket',
        unitName: 'NTK',
        url: metadataUrl,
        metadataHash,
        defaultFrozen: false,
      })

      enqueueSnackbar(`🎉 NFT minted successfully! TX: ${createNFTResult.txIds[0]}`, {
        variant: 'success',
      })
      setMetadataUrl('')
    } catch (e) {
      console.error(e)
      enqueueSnackbar('❌ Failed to mint NFT', { variant: 'error' })
    }

    setLoading(false)
  }

  return (
    <dialog id="nft_mint_modal" className={`modal ${openModal ? 'modal-open' : ''} bg-slate-200`}>
      <form method="dialog" className="modal-box">
        <h3 className="font-bold text-lg text-purple-700">Mint Your MasterPass NFT 🎟️</h3>
        <p className="text-sm mb-4 text-gray-600">
          Paste your metadata URL from IPFS (Pinata) to mint your unique NFT on Algorand.
        </p>

        <input
          type="text"
          data-test-id="metadata-url"
          placeholder="Paste metadata URL here"
          className="input input-bordered w-full"
          value={metadataUrl}
          onChange={(e) => setMetadataUrl(e.target.value)}
        />

        <div className="modal-action">
          <button className="btn" onClick={() => setModalState(!openModal)}>
            Close
          </button>
          <button
            data-test-id="mint-nft"
            type="button"
            className={`btn ${metadataUrl ? '' : 'btn-disabled'}`}
            onClick={handleMintNFT}
          >
            {loading ? <span className="loading loading-spinner" /> : 'Mint NFT'}
          </button>
        </div>
      </form>
    </dialog>
  )
}

export default NFTmint
