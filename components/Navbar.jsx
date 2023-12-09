import React from 'react'
import Image from 'next/image'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import {
  ConnectWallet,
  useAddress
} from '@thirdweb-dev/react'
import Link from 'next/link'

const Navbar = () => {

  const address = useAddress();

  return (
    <div>
      <main className="p-4 bg-gradient-to-r from-green-300 via-yellow-300 to-pink-300">
        <div className="flex justify-between items-center">
          <Image src="/game2.png" height={50} width={50} />
          <div className="flex w-1/6 justify-between items-center">
          {address && (
            <Link href={`/profile/${address}`}>
              <h2>Profile</h2>
            </Link>
          )}
            <Link href="/buy">
              <h2>Marketplace</h2>
            </Link>
            <Link href="/sell">
              <h2>Sell</h2>
            </Link>
          </div>
          <div className="flex items-center w-3/12">
          <ConnectWallet/>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Navbar
