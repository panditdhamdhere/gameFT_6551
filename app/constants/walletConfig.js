import { smartWallet, embeddedWallet, localWallet } from "@thirdweb-dev/react";

//gasless implementation
const smartWalletOptions = {
    factoryAddress: "0x8615a6223ca29d0E11f8882f8dB8841967B0947b",
    gasless: true,
  };

   //custom wallets
   export const customSmartWallet = smartWallet(
    embeddedWallet(),
    smartWalletOptions,
  )

  export const customSmartWallet2 = smartWallet(
    localWallet(),
    smartWalletOptions,
  )

  customSmartWallet.meta.name = "Social Login"
  customSmartWallet.meta.iconURL = ""