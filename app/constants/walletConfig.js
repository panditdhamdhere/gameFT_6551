
import { smartWallet, embeddedWallet, localWallet } from "@thirdweb-dev/react";
const factoryAddress = process.env.NEXT_PUBLIC_FACTORY_ADDRESS
console.log(process.env.NEXT_PUBLIC_FACTORY_ADDRESS,)

//gasless implementation
const smartWalletOptions = {
    factoryAddress: factoryAddress,
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