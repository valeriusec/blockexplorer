"use client"
import BlockContainer from '@/components/BlockContainer'
import Transactions from '@/components/Transactions'
import { Button } from '@/components/ui/button'
import { Alchemy, Block, BlockTag, BlockWithTransactions, Network, TransactionResponse } from 'alchemy-sdk'
import { useSearchParams } from 'next/navigation'
import React from 'react'

type Props = {}

const config = {
  apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
}

const alchemy = new Alchemy(config);

const BlockPage = (props: Props) => {
  const searchParams = useSearchParams();
  const hash: any = searchParams.get('hash');
  const [block, setBlock] = React.useState<BlockWithTransactions>();
  const [isLoading, setIsLoading] = React.useState<boolean>(true)

  React.useEffect(() => {
    const getBlock = async () => {
      try {
        setBlock(await alchemy.core.getBlockWithTransactions(hash));
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };
    getBlock();
  }, [hash]);

  const renderPage = () => {
    if (block && !isLoading) {
      return (
        <main className='flex flex-col items-center w-full gap-8 p-4'>
          <BlockContainer title="Block" block={block} isButtonVisible={false} />
          <h2>Block Transactions</h2>
          <Transactions block={block} />
        </main>
      )
    } else if (!block && !isLoading) {
      return (
        <div className='flex items-center justify-center w-full h-full'>
          <h3>
            Block Not Found
          </h3>
        </div>
      )
    }
  }

  return (
    <>
      {isLoading ? <div className='flex items-center justify-center w-full h-full'>
        <h3>
          Loading...
        </h3>
      </div> : renderPage()}
    </>
  )
}

export default BlockPage