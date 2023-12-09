import {
  ThirdwebNftMedia,
  useContract,
  useValidDirectListings,
  useValidEnglishAuctions,
} from "@thirdweb-dev/react";
import { ColorRing } from "react-loader-spinner";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  MARKETPLACE_ADDRESS,
  NFT_DROP_ADDRESS,
} from "@/app/constants/constant";

export default function NFTComponent({ nft }) {
  const { contract: marketplace, isLoading: loadingMarketplace } = useContract(
    MARKETPLACE_ADDRESS,
    "marketplace-v3"
  );

  const { data: directListing, isLoading: loadingDirectListing } =
    useValidDirectListings(marketplace, {
      tokenContract: NFT_DROP_ADDRESS,
      tokenId: nft.metadata.id,
    });

  return (
    <div>
      <Card className="each-nft-container">
        <div>
          <CardHeader className="nft-header">
            <CardTitle className="metadata-name">{nft.metadata.name}</CardTitle>
            <CardDescription>Token ID #{nft.metadata.id}</CardDescription>
          </CardHeader>
          <ThirdwebNftMedia metadata={nft.metadata} className="nft-img" />
          <CardContent>
            {loadingMarketplace || loadingDirectListing ? (
              <ColorRing
                visible={true}
                height="80"
                width="80"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
              />
            ) : directListing && directListing[0] ? (
              <div className="card-footer">
                <h3>
                  Price: {directListing[0]?.currencyValuePerToken.displayValue}{" "}
                  {directListing[0]?.currencyValuePerToken.symbol}
                </h3>
                <button>View Assets</button>
              </div>
            ) : (
              <div className="card-footer">
                <h3>NFT Not listed for sale</h3>
                <button>View Assets</button>
              </div>
            )}
          </CardContent>
          <CardFooter></CardFooter>
        </div>
      </Card>
    </div>
  );
}
