import NFTComponent from "./NFT";
import Link from "next/link";
import { NFT_DROP_ADDRESS } from "@/app/constants/constant";

export default function NFTData({
  isLoading,
  data,
  overrideOnclickBehavior,
  emptyText = "No NFTs Found",
}) {
  const address = NFT_DROP_ADDRESS;

  return (
    <div>
      {isLoading ? (
        <h2>Loading.....</h2>
      ) : data && data.length > 0 ? (
        <div className="grid grid-cols-4 gap-4 ">
          {data.map((nft) =>
            !overrideOnclickBehavior ? (
              <Link
                href={`/smartaccount/${address}/${nft.metadata.id}`}
                key={nft.metadata.id}
              >
                <NFTComponent nft={nft} />
              </Link>
            ) : (
              <div
                key={nft.metadata.id}
                onClick={() => overrideOnclickBehavior(nft)}
              >
                <NFTComponent nft={nft} />
              </div>
            )
          )}
        </div>
      ) : (
        <>{emptyText}</>
      )}
    </div>
  );
}
