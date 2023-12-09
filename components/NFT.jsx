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

export default function NFTComponent({ nft }) {
  const { contract: marketplace, isLoading: loadingMarketplace } = useContract(
    "0x9c5DC0F93F70Edc4bE9239c777F5C289b6756c51",
    "marketplace-v3"
  );

  const { data: directListing, isLoading: loadingDirectListing } =
    useValidDirectListings(marketplace, {
      tokenContract: "0xfD166cCCb9c00113DfFEd958dD2809A2610e1149",
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
