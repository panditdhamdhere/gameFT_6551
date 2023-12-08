'use client'

import {useRouter} from 'next/navigation';
const ClientId = process.env.NEXT_PUBLIC_CLIENT_ID

import Image from 'next/image'

import {
  ConnectWallet,
  MediaRenderer,
  darkTheme,
  ThirdwebProvider,
  embeddedWallet,
  useAddress,
  localWallet,
  smartWallet,
  metamaskWallet,
  useContract,
  useMetadata,
  Web3Button
} from "@thirdweb-dev/react";

import { customSmartWallet, customSmartWallet2 } from "./constants/walletConfig"

export default function Home() {
  return (
    <ThirdwebProvider
      activeChain={"polygon"}
      clientId={ClientId}
      supportedWallets={[
        customSmartWallet,
        customSmartWallet2,
      ]}
    >
      <Landing />
    </ThirdwebProvider>
  )
}

const Landing = () => {

  const address = useAddress()
  const router = useRouter()

  //Connect Wallet Theme
  const customeTheme = darkTheme({
    colors: {
      modalBg: "linear-gradient(to right, rgb(255, 228, 230), rgb(204, 251, 241))",
      primaryText: "#555",
      secondaryText: "#333333",
      walletSelectorButtonHoverBg: "rgb(194, 207, 204)",
      separatorLine: "#888",
      borderColor: "#333333",
    }
  })

  return (
    <div>

      {address ?
        //Wallet Connected Page (Marketplace)
        <ConnectWallet />

        :
        //Wallet Not Connected (Landing Page)
        <main className="flex h-screen items-center justify-center bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-700">
          <ConnectWallet
            theme={customeTheme}
            modalSize={"wide"}
            btnTitle="ENTER GAME"

            modalTitle="GameFT"
            modalTitleIconUrl=""

            welcomeScreen={() => {
              return (
                <div>
                  <MediaRenderer
                    src={"ipfs://QmT5ULF1ZQpsKUHmnWk7yBoPCnSYLQckAR9VRcEopFBiSN/game-box-gif.gif"}
                    height={570}
                    width={570}
                    style={{ objectFit: "fill", objectPosition: "right" }}
                  />
                </div>
              )
            }}
          />
        </main>
      }
    </div>
  )
}
