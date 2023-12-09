"use client";
import { FaArrowRight } from "react-icons/fa6";
import Spline from "@splinetool/react-spline";
import { useRouter } from "next/navigation";
const ClientId = process.env.NEXT_PUBLIC_CLIENT_ID;
import Image from "next/image";

import {
  ConnectWallet,
  MediaRenderer,
  darkTheme,
  ThirdwebProvider,
  useAddress,
} from "@thirdweb-dev/react";

import {
  customSmartWallet,
  customSmartWallet2,
} from "./constants/walletConfig";

export default function Home() {
  return (
    <ThirdwebProvider
      activeChain={"polygon"}
      clientId={ClientId}
      supportedWallets={[customSmartWallet, customSmartWallet2]}
    >
      <Landing />
    </ThirdwebProvider>
  );
}

const Landing = () => {
  const address = useAddress();
  const router = useRouter();

  //Connect Wallet Theme
  const customeTheme = darkTheme({
    colors: {
      modalBg: "rgba(255, 255, 255, 0.1)",
      primaryText: "white",
      // backdropFilter: "blur(10px)",
      secondaryText: "white",
      walletSelectorButtonHoverBg: "rgb(194, 207, 204)",
      separatorLine: "#888",
      // borderColor: "#333333",
      borderRadius: "100px",
      border: "1px solid white",
    },
  });

  return (
    <div>
      {address ? (
        //Wallet Connected Page (Marketplace)
        router.push(`/profile/${address}`)
      ) : (
        //Wallet Not Connected (Landing Page)
        <main className=" landing">
          <div className="top">
            <div className="circles"></div>
            <div className="line"></div>
            <p className="company-name">GameFT 6551</p>
            <div className="line"></div> <div className="circles"></div>
          </div>
          <div className="bottom">
            <div className="left">
              <h1>
                First-Ever <br /> Exclusive <span>erc-6551</span> <br />{" "}
                Marketplace
              </h1>
              <p>Now bundle your In-game assets with your game identity</p>
              <ConnectWallet
                modalSize="wide"
                className="connect-wallet-btn "
                theme={customeTheme}
                btnTitle="Enter Game"
                modalTitle="GameFT"
                // modalTitleIconUrl="/assets/imgs/walletlogo.png"
                welcomeScreen={() => {
                  return (
                    <div>
                      <MediaRenderer
                        width={570}
                        style={{ objectFit: "fill", objectPosition: "right" }}
                      />
                    </div>
                  );
                }}
              />
            </div>
            <div className="right">
              {/* <Spline scene="https://prod.spline.design/eHp77GJEs98xT8-4/scene.splinecode" /> */}
              <Spline scene="https://prod.spline.design/Nu4nr-9eCUbLHGil/scene.splinecode" />
            </div>
          </div>
        </main>
      )}
    </div>
  );
};
