import { ethers } from "ethers";
import { SmartWallet } from "@thirdweb-dev/wallets";
const ClientId = process.env.NEXT_PUBLIC_CLIENT_ID;
import { Polygon } from '@thirdweb-dev/chains';

import {
  FACTORY_ADDRESS,
  NFT_DROP_ADDRESS,
  IMPLEMENTATION_ADDRESS,
} from "../../app/constants/constant";

export default function newSmartWallet(token) {
  //Smart Wallet config object
  const config = {
    chain: Polygon, // the chain where your smart wallet will be or is deployed
    factoryAddress: FACTORY_ADDRESS, // your own deployed account factory address
    clientId: ClientId, // obtained from the thirdweb dashboard
    gasless: true, // enable or disable gasless transactions
    factoryInfo: {
      createAccount: async (
        factory,
        owner
      ) => {
        const account = factory.prepare("createAccount", [
          IMPLEMENTATION_ADDRESS,
          Polygon.chainId,
          NFT_DROP_ADDRESS,
          token.metadata.id,
          0,
          ethers.utils.toUtf8Bytes("")
        ]);
        console.log("here", account);
        return account;
      }, // the factory method to call to create a new account
      getAccountAddress: async (
        factory,
        owner
      ) => {
        return factory.call("account", [
          IMPLEMENTATION_ADDRESS,
          Polygon.chainId,
          NFT_DROP_ADDRESS,
          token.metadata.id,
          0
        ]);
      }, // the factory method to call to get the account address
    },
  };
  return new SmartWallet(config);
}