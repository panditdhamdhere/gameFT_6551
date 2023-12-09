"use client";

const ClientId = process.env.NEXT_PUBLIC_CLIENT_ID;
import { NFT_DROP_ADDRESS } from "@/app/constants/constant";

import React from "react";
import {
  useContract,
  useOwnedNFTs,
  ThirdwebProvider,
  useAddress,
  Web3Button,
  ConnectWallet,
} from "@thirdweb-dev/react";
import NFTData from "@/components/NFTData";
import Navbar from "@/components/Navbar";

import {
  customSmartWallet,
  customSmartWallet2,
} from "../../constants/walletConfig";

export default function Page() {
  return (
    <ThirdwebProvider
      activeChain={"polygon"}
      clientId={ClientId}
      supportedWallets={[customSmartWallet, customSmartWallet2]}
    >
      <Address />
    </ThirdwebProvider>
  );
}

const Address = () => {
  const address = useAddress();

  const { contract: nftCollection } = useContract(NFT_DROP_ADDRESS);

  const { data: ownedNfts, isLoading: loadingOwnedNfts } = useOwnedNFTs(
    nftCollection,
    address
  );
  console.log(ownedNfts);
  return address ? (
    <div className="profile">
      <Navbar />
      <div className="position2">
        <div className="line-circle">
          <div className="circle"></div>
          <div className="line"></div>
        </div>
        <h1>GENRATE YOUR PROFILE</h1>
        <div className="line-circle">
          <div className="line"></div>
          <div className="circle"></div>
        </div>
      </div>
      <NFTData
        data={ownedNfts}
        isLoading={loadingOwnedNfts}
        address={address}
        emptyText={"You don't own any NFTs yet from this collection."}
      />
      <div className="flex flex-col justify-center items-center mt-3">
        <Web3Button
          contractAddress={NFT_DROP_ADDRESS}
          action={(contract) => contract.erc721.claim(1)}
          className="claim-btn"
        >
          Claim New NFT
        </Web3Button>{" "}
      </div>
    </div>
  ) : (
    <div>
      <Navbar />
      <p>Connect Wallet</p>
    </div>
  );
};
