'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import SaleInfo from '@/components/SaleInfo'
import { MARKETPLACE_ADDRESS, NFT_DROP_ADDRESS } from '@/app/constants/constant'
const ClientId = process.env.NEXT_PUBLIC_CLIENT_ID;

import {
  ThirdwebProvider,
  useAddress,
  useContract,
  useOwnedNFTs,
  ThirdwebNftMedia,
} from '@thirdweb-dev/react'
import NFTGrid from '@/components/NFTGrid'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'


import {
  customSmartWallet,
  customSmartWallet2,
} from "../constants/walletConfig";

export default function Page() {
  return (
    <ThirdwebProvider
      activeChain={"polygon"}
      clientId={ClientId}
      supportedWallets={[customSmartWallet, customSmartWallet2]}
    >
      <Navbar />
      <Sell />
    </ThirdwebProvider>
  )
}

const Sell = () => {
  const { contract } = useContract(NFT_DROP_ADDRESS)
  const address = useAddress()
  const { data, isLoading } = useOwnedNFTs(contract, address)
  console.log(data)

  const [selectedNFT, setSelectedNFT] = useState(undefined)
  return (
    <div>
      <h2>Sell NFTs</h2>
      <div className="flex justify-center">
        {!selectedNFT ? (
          <div className="w-full">
            <NFTGrid
              data={data}
              isLoading={isLoading}
              overrideOnclickBehavior={(nft) => {
                setSelectedNFT(nft)
              }}
              emptyText={"You don't own any NFTs yet from this collection."}
            />
          </div>
        ) : (
          <div className="flex w-2/5 justify-center">
            <div className="flex justify-between items-start">
              <ThirdwebNftMedia
                metadata={selectedNFT.metadata}
                width="80%"
                height="80%"
              />
              <div>
                {selectedNFT?.metadata?.name}
                <SaleInfo
                    nft={selectedNFT}
                />
              </div>
              <button
                  onClick={() => {
                    setSelectedNFT(undefined)
                  }}
                >
                  X
                </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
