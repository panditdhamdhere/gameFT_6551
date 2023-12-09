import {
  ThirdwebNftMedia,
  useContract,
  useValidDirectListings,
  useValidEnglishAuctions,
} from "@thirdweb-dev/react";

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
      <Card>
        <CardHeader>
          <CardTitle>{nft.metadata.name}</CardTitle>
          <CardDescription>Token ID #{nft.metadata.id}</CardDescription>
        </CardHeader>
        <ThirdwebNftMedia metadata={nft.metadata} />
        <CardContent>
          {loadingMarketplace || loadingDirectListing ? (
            <h1>Loading</h1>
          ) : directListing && directListing[0] ? (
            <div>
              <h2>
                Price: {directListing[0]?.currencyValuePerToken.displayValue}{" "}
                {directListing[0]?.currencyValuePerToken.symbol}
              </h2>
            </div>
          ) : (
            <div>
              <h3>NFT Not listed for sale</h3>
            </div>
          )}
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
}
