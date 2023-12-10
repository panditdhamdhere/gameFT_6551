"use client";

import NFTGrid from "@/components/NFTGrid";
import Navbar from "@/components/Navbar";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { useContract, useNFTs } from "@thirdweb-dev/react-core";
import { NFT_DROP_ADDRESS } from "../constants/constant";
const ClientId = process.env.NEXT_PUBLIC_CLIENT_ID;

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
      <Buy />
    </ThirdwebProvider>
  );
}

const Buy = () => {
  const { contract } = useContract(NFT_DROP_ADDRESS);
  const { data, isLoadong } = useNFTs(contract);
  console.log(data);

  return (
    <div>
      <div className="position2">
        <div className="line-circle">
          <div className="circle"></div>
          <div className="line"></div>
        </div>
        <h1>Buy Player IDs</h1>
        <div className="line-circle">
          <div className="line"></div>
          <div className="circle"></div>
        </div>
      </div>
      {/* <p>Explore NFTs and their assets</p> */}
      <NFTGrid isLoadong={isLoadong} data={data} emptyText={""} />
    </div>
  );
};
