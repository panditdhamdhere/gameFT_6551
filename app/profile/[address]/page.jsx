'use client'

const ClientId = process.env.NEXT_PUBLIC_CLIENT_ID
import { NFT_DROP_ADDRESS } from '@/app/constants/constant'

import React from 'react'
import {
  useContract,
  useOwnedNFTs,
  ThirdwebProvider,
  useAddress,
  Web3Button,
} from '@thirdweb-dev/react'
// import NFTData from '@/components/NFTData'
// import Navbar from '@/components/Navbar'


import { customSmartWallet, customSmartWallet2 } from "../../constants/walletConfig"

export default function Page() {
  return (
    <ThirdwebProvider
      activeChain={"polygon"}
      clientId={ClientId}
      supportedWallets={[
        customSmartWallet,
        customSmartWallet2,
      ]}
    >
      <Address />
    </ThirdwebProvider>
  )
}

const Address = () => {
  const address = useAddress()

  const { contract: nftCollection } = useContract(
    NFT_DROP_ADDRESS,
  )

  const { data: ownedNfts, isLoading: loadingOwnedNfts } = useOwnedNFTs(
    nftCollection,
    address,
  )
  console.log(ownedNfts)
  return address ? (
    <div>
      {/* <Navbar />
      <NFTData
        data={ownedNfts}
        isLoading={loadingOwnedNfts}
        address={address}
        emptyText={"You don't own any NFTs yet from this collection."}
      /> */}
      <div className="flex flex-col justify-center items-center mt-3">
        <Web3Button
          contractAddress={NFT_DROP_ADDRESS}
          action={(contract) => contract.erc721.claim(1)}
        >
          Claim New NFT
        </Web3Button>
      </div>
    </div>
  ) : (
    <div>
      {/* <Navbar /> */}
      <p>Connect Wallet</p>
    </div>
  )
}
