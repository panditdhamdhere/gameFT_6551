'use client'
import React from 'react'
import { init, fetchQuery } from '@airstack/airstack-react'
import { useState } from 'react'
init(process.env.NEXT_PUBLIC_AIRSTACK_API_KEY, 'dev')
import { XMTPWidget } from '@/components/XMTPWidget'

const page = () => {
  const [followers, setFollowers] = useState([])
  const [handle, setHandle] = useState()
  const [result, setResult] = useState()

  const manageHandle = (e) => {
    setHandle(e.target.value)
    setFollowers([])
  }

  const Challege = (address,handle) => {
    const data = XMTPWidget(address, handle)
    setResult(data)
  }
  const getFollowers = async (lens) => {
    setFollowers([])
    const query = `
        query GetAddressesOfFarcasters {
            Socials(
              input: {filter: {identity: {_in: ["${lens}"]}}, blockchain: ethereum}
            ) {
              Social {
                userAssociatedAddresses
                followers {
                  Follower {
                    followerAddress {
                      addresses
                      xmtp {
                        isXMTPEnabled
                      }
                    }
                  }
                }
              }
            }
          }`
    const { data, loading, error } = await fetchQuery(query)
    setFollowers(data.Socials.Social[0].followers.Follower)
    console.log(data)
  }

  return (
    <div className="w-full h-full m-16 flex flex-col">
      <h1 className="text-center">Search for the people to challege game.</h1>
      <div className="item-center">
        <input type="text" onChange={(e) => manageHandle(e)} />
        <button onClick={() => getFollowers(handle)}>search</button>
      </div>
      <div className="border border-red-50">
        {followers.map((follower) => {
          if (
            follower.followerAddress?.xmtp &&
            follower.followerAddress?.xmtp[0]?.isXMTPEnabled
          )
            return (
              <div key={follower.followerAddress}>
                <p>{follower.followerAddress?.addresses[0]}</p>
                <div onClick={() => Challege(follower.followerAddress,handle)}>Challege</div>
              </div>
            )
        })}
      </div>
    </div>
  )
}

export default page
