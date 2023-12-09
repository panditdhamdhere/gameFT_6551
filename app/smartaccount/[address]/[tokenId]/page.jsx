'use client'
import React, { useState, useEffect } from 'react'
import newSmartWallet from '@/components/smartWallets/SmartWallet'
import GameConnected from '@/components/smartWallets/GameConnected'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  NFT_DROP_ADDRESS,
  MARKETPLACE_ADDRESS,
} from '../../../constants/constant'
const ClientID = process.env.NEXT_PUBLIC_CLIENT_ID
const SecretKey = process.env.NEXT_PUBLIC_SECRET_KEY
import {
  ThirdwebNftMedia,
  ThirdwebProvider,
  useWallet,
  useAddress,
  ConnectWallet
} from '@thirdweb-dev/react'
import Navbar from '@/components/Navbar'
import { ThirdwebSDK } from '@thirdweb-dev/sdk'
import Link from 'next/link'

import {
  customSmartWallet,
  customSmartWallet2,
} from '../../../constants/walletConfig'

export default function TokenBound(params) {
  const [nft, setNft] = useState()
  const [contractMetadata, setContractMetadata] = useState()

  useEffect(() => {
    data()
  }, [])

  async function data() {
    console.log(params)
    const { nft, contractMetadata } = await getData(params)
    console.log(nft)
    setNft(nft)
    setContractMetadata(contractMetadata)
  }

  return (
    <ThirdwebProvider
      activeChain={'polygon'}
      clientId={ClientID}
      supportedWallets={[customSmartWallet, customSmartWallet2]}
    >
      <Navbar />
      {nft && contractMetadata && (
        <SmartAccount nft={nft} contractMetadata={contractMetadata} />
      )}
    </ThirdwebProvider>
  )
}

const SmartAccount = ({ nft, contractMetadata }) => {
  const [smartWalletAddress, setSmartWalletAddress] = useState(null)
  const [signer, setSigner] = useState()
  const [game, setGame] = useState(false)

  const address = useAddress()
  const wallet = useWallet()

  useEffect(() => {
    const createSmartWallet = async (nft) => {
      if (nft && smartWalletAddress == null && address && wallet) {
        const smartWallet = newSmartWallet(nft)
        console.log('personal wallet', address)
        await smartWallet.connect({
          personalWallet: wallet,
        })
        setSigner(await smartWallet.getSigner())
        console.log('signer', signer)
        setSmartWalletAddress(await smartWallet.getAddress())
        console.log('smart wallet address', await smartWallet.getAddress())
        return smartWallet
      } else {
        console.log('smart wallet not created')
      }
    }
    createSmartWallet(nft)
  }, [nft, smartWalletAddress, address, wallet])

  return (
    <div className="w-full">
      {!game ? (
        <>
          <div className="w-72">
            <Card className="w-full">
              <CardHeader>
                <CardTitle>{nft.metadata?.name}</CardTitle>
                <CardDescription>{nft.metadata?.description}</CardDescription>
                <ThirdwebNftMedia
                  metadata={nft?.metadata}
                  width="100%"
                  height="100%"
                />
                <CardDescription className="w-14">
                  <p className="font-bold text-">
                    {`${smartWalletAddress}`.substr(0, 4)}.....
                    {`${smartWalletAddress}`.substr(-4)}
                  </p>
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
          <div className="cursor-pointer" onClick={() => setGame(true)}>
            <Card className="relative w-52 ml-3 mt-7">
              <CardHeader>
                <CardTitle>Grand Cyber Auto</CardTitle>
                <CardDescription>First game</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </>
      ) : (
        <div className="w-full flex">
          <div>
            <button className="text-white" onClick={() => setGame(false)}>back</button>
          </div>
        <div>
          <Card className="w-64">
            <CardHeader>
              <CardTitle>{nft.metadata?.name}</CardTitle>
              <CardDescription>{nft.metadata?.description}</CardDescription>
              <ThirdwebNftMedia
                metadata={nft?.metadata}
                width="100%"
                height="100%"
              />
              <CardDescription className="w-14">
                <p className="font-bold text-">
                  {`${smartWalletAddress}`.substr(0, 4)}.....
                  {`${smartWalletAddress}`.substr(-4)}
                </p>
              </CardDescription>
            </CardHeader>
          </Card>
          <ConnectWallet />
          <Link className="cursor-pointer" href="/share"><p>Share</p></Link>
          </div>
          <GameConnected signer={signer} />
        </div>
      )}
    </div>
  )
}

export const getData = async (context) => {
  const tokenId = context.params?.tokenId
  const contractAddress = context.params?.address

  console.log(context.params?.tokenId)

  const sdk = new ThirdwebSDK('polygon', {
    clientId: ClientID,
    secretKey: SecretKey,
  })
  const contract = await sdk.getContract(contractAddress)

  const nft = await contract.erc721.get(tokenId)

  let contractMetadata

  try {
    contractMetadata = await contract.metadata.get()
  } catch (e) {}

  return {
    nft,
    contractMetadata: contractMetadata,
  }
}
