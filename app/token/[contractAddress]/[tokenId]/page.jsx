"use client";
import { useState, useEffect } from "react";
import {
  NFT_DROP_ADDRESS,
  MARKETPLACE_ADDRESS,
} from "../../../constants/constant";
const ClientID = process.env.NEXT_PUBLIC_CLIENT_ID;
const SecretKey = process.env.NEXT_PUBLIC_SECRET_KEY;

import {
  MediaRenderer,
  ThirdwebNftMedia,
  Web3Button,
  useContract,
  useMinimumNextBid,
  useValidDirectListings,
  useValidEnglishAuctions,
  ThirdwebProvider,
  smartWallet,
  embeddedWallet,
  localWallet,
  metamaskWallet,
} from "@thirdweb-dev/react";
import Navbar from "@/components/Navbar";
import { NFT, ThirdwebSDK } from "@thirdweb-dev/sdk";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  customSmartWallet,
  customSmartWallet2,
} from "../../../constants/walletConfig";

export default function Token(params) {
  const [nft, setNft] = useState();
  const [contractMetadata, setContractMetadata] = useState();

  useEffect(() => {
    data();
  }, []);

  async function data() {
    console.log(params);
    const { nft, contractMetadata } = await getData(params);
    console.log(nft);
    setNft(nft);
    setContractMetadata(contractMetadata);
    console.log("fuck");
  }
  return (
    <ThirdwebProvider
      activeChain={"polygon"}
      clientId={ClientID}
      supportedWallets={[customSmartWallet, customSmartWallet2]}
    >
      <Navbar />
      <TokenPage nft={nft} contractMetadata={contractMetadata} />
    </ThirdwebProvider>
  );
}

const TokenPage = ({ nft, contractMetadata }) => {
  const { contract: marketplace, isLoading: loadingMarketplace } = useContract(
    MARKETPLACE_ADDRESS,
    "marketplace-v3"
  );

  const { contract: nftCollection } = useContract(NFT_DROP_ADDRESS);

  const { data: directListing, isLoading: loadingDirectListing } =
    useValidDirectListings(marketplace, {
      tokenContract: NFT_DROP_ADDRESS,
      tokenId: nft?.metadata.id,
    });

  async function buyListing() {
    let txResult;

    //Add for auction section
    if (directListing?.[0]) {
      txResult = await marketplace?.directListings.buyFromListing(
        directListing[0].id,
        1
      );
    } else {
      throw new Error("No listing found");
    }

    return txResult;
  }

  return (
    <div className="m-9">
      {nft ? (
        <div className="w-64">
          <Card className="each-nft-container">
            <CardHeader className="nft-header">
              <CardTitle className="metadata-name">
                {nft.metadata.name}
              </CardTitle>
              <CardDescription>{nft.metadata.description}</CardDescription>
              <ThirdwebNftMedia
                metadata={nft.metadata}
                width="100%"
                height="100%"
              />
            </CardHeader>
            <CardFooter>
              {directListing && directListing[0] ? (
                <div>
                  <h2>
                    {directListing[0]?.currencyValuePerToken.displayValue}
                    {" " + directListing[0]?.currencyValuePerToken.symbol}
                  </h2>
                  <Web3Button
                    contractAddress={NFT_DROP_ADDRESS}
                    action={async () => buyListing()}
                    isDisabled={!directListing || !directListing[0]}
                  >
                    Buy at asking price
                  </Web3Button>
                </div>
              ) : (
                <h2>Not for sale</h2>
              )}
            </CardFooter>
          </Card>
        </div>
      ) : (
        <h1>No NFT Found</h1>
      )}
    </div>
  );
};

export const getData = async (context) => {
  const tokenId = context.params?.tokenId;
  const contractAddress = context.params?.contractAddress;

  console.log(context.params?.tokenId);

  const sdk = new ThirdwebSDK("polygon", {
    clientId: ClientID,
    secretKey: SecretKey,
  });
  const contract = await sdk.getContract(contractAddress);

  const nft = await contract.erc721.get(tokenId);

  let contractMetadata;

  try {
    contractMetadata = await contract.metadata.get();
  } catch (e) {}

  return {
    nft,
    contractMetadata: contractMetadata,
  };
};

// export const getStaticPaths = async () => {
//   const sdk = new ThirdwebSDK('mumbai', {
//     clientId: '380b8443e6fa23921cde8c690f9a9bca',
//     secretKey:
//       'G-rynmeuDqqCspIX3dm3W55UFF8Tiz3KSJw7Ck1cJ2ITym-FLr99U8sCpuvbA-R0jrILtcQWm123sK9a99dsSw',
//   })
//   const contractAddress = "0xfD166cCCb9c00113DfFEd958dD2809A2610e1149"

//   const contract = await sdk.getContract(contractAddress);

//   const nfts = await contract.erc721.getAll();

//   const paths = nfts.map((nft) => {
//     return {
//         contractAddress: contractAddress,
//         tokenId: nft.metadata.id,
//     };
//   });

//   return {
//     paths,
//     fallback: "blocking", // can also be true or 'blocking'
//   };
// };
