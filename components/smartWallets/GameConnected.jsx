import React from 'react'
import { ConnectWallet, ThirdwebSDKProvider, useAddress } from "@thirdweb-dev/react";
import { Polygon } from '@thirdweb-dev/chains';
const ClientId = process.env.NEXT_PUBLIC_CLIENT_ID;



export default function GameConnected({signer}) {
    return (
        <ThirdwebSDKProvider signer={signer} activeChain={Polygon} clientId={ClientId}>
            <Game/>
            <ConnectWallet />
        </ThirdwebSDKProvider>
    )
}

const Game = () => {
    const address = useAddress()
    return(
        <p>Smart wallet address: {address}</p>
    )
}