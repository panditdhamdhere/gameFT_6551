import React from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { MARKETPLACE_ADDRESS, NFT_DROP_ADDRESS } from '@/app/constants/constant'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import {
  Web3Button,
  useContract,
  useCreateDirectListing,
} from '@thirdweb-dev/react'

const SaleInfo = ({ nft }) => {
  const router = useRouter()
  const { contract: marketplace } = useContract(
    MARKETPLACE_ADDRESS,
    'marketplace-v3',
  )

  const { contract: nftCollection } = useContract(
    NFT_DROP_ADDRESS,
  )

  const { mutateAsync: createDirectListing } = useCreateDirectListing(
    marketplace,
  )

  async function checkAndProvideApproval() {
    const hasApproval = await nftCollection?.call(
      'isApprovedForAll',
      [nft.owner,
      MARKETPLACE_ADDRESS]
    )

    if (!hasApproval) {
      const txResult = await nftCollection?.call(
        'setApprovalForAll',
        [MARKETPLACE_ADDRESS,
        true]
      )

      if (txResult) {
        console.log('Approval provided')
      }
    }

    return true
  }

  const {
    register: registerDirect,
    handleSubmit: handleSubmitDirect,
  } = useForm({
    defaultValues: {
      nftContractAddress: NFT_DROP_ADDRESS,
      tokenId: nft.metadata.id,
      price: '0',
      startDate: new Date(),
      endDate: new Date(),
    },
  })

  async function handleSubmissionDirect(data) {
    await checkAndProvideApproval()
    const txResult = await createDirectListing({
      assetContractAddress: data.nftContractAddress,
      tokenId: data.tokenId,
      pricePerToken: data.price,
      startTimestamp: new Date(data.startDate),
      endTimestamp: new Date(data.endDate),
    })

    return txResult
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Direct Listing</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Listing starts on:</p>
          <Input
            placeholder="Select Date and Time"
            size="md"
            type="datetime-local"
            {...registerDirect('startDate')}
          />
        </CardContent>
        <CardContent>
          <p>Listing ends on:</p>
          <Input
            placeholder="Select Date and Time"
            size="md"
            type="datetime-local"
            {...registerDirect('endDate')}
          />
        </CardContent>
        <CardFooter>
          <p>Price:</p>
          <Input
            placeholder="0"
            size="md"
            type="number"
            {...registerDirect('price')}
          />
        </CardFooter>
        <Web3Button
          contractAddress={MARKETPLACE_ADDRESS}
          action={async () => {
            await handleSubmitDirect(handleSubmissionDirect)()
          }}
          onSuccess={(txResult) => {
            router.push(`/token/${NFT_DROP_ADDRESS}/${nft.metadata.id}`)
          }}
        >
          Create Direct Listing
        </Web3Button>
      </Card>
    </div>
  )
}

export default SaleInfo
