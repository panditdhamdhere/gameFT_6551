import React from "react";
import {
  ConnectWallet,
  ThirdwebSDKProvider,
  useAddress,
} from "@thirdweb-dev/react";
import { Polygon } from "@thirdweb-dev/chains";
import { init } from "@airstack/airstack-react";
const ClientId = process.env.NEXT_PUBLIC_CLIENT_ID;
init(process.env.NEXT_PUBLIC_AIRSTACK_API_KEY, "dev");
import { useQuery } from "@airstack/airstack-react";

export default function GameConnected({ signer }) {
  return <></>;
}

const Game = ({ signer }) => {
  const query = `
query MyQuery {
    TokenBalances(
      input: {filter: {owner: {_in: ["${signer.address}"]}, tokenType: {_in: [ERC1155, ERC721]}}, blockchain: polygon, limit: 50}
    ) {
      TokenBalance {
        owner {
          identity
        }
        amount
        tokenAddress
        tokenId
        tokenType
        tokenNfts {
          contentValue {
            image {
              extraSmall
              small
              medium
              large
              original
            }
          }
        }
      }
      pageInfo {
        nextCursor
        prevCursor
      }
    }
  }
`;
  const { data, loading, error } = useQuery(query, {}, { cache: false });

  // Render your component using the data returned by the query
  console.log(data);

  const address = useAddress();
  return (
    <div className="navbarx ">
      <nav className="">
        <p className="">Assets</p>
        <p>Sell</p>
        <p>Marketplace</p>
      </nav>
    </div>
  );
};
