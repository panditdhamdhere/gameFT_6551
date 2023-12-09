import NFTComponent from "./NFT";
import Link from "next/link";
import { NFT_DROP_ADDRESS } from "@/app/constants/constant";
import { ColorRing } from "react-loader-spinner";

export default function NFTData({
  isLoading,
  data,
  overrideOnclickBehavior,
  emptyText = "",
}) {
  const address = NFT_DROP_ADDRESS;

  return (
    <div>
      {isLoading ? (
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
        />
      ) : data && data.length > 0 ? (
        <div className="each-nft-container">
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
