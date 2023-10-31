"use client"
import React from 'react'
import { Alchemy, Block, BlockWithTransactions, Network, Utils } from 'alchemy-sdk'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'
import BlockContainer from './BlockContainer'
import Transactions from './Transactions'

type Props = {}

const config = {
    apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
}

const alchemy = new Alchemy(config);

const LatestBlock = (props: Props) => {
    const [block, setBlock] = React.useState<BlockWithTransactions>();

    React.useEffect(() => {
        const getBlock = async () => {
            setBlock(await alchemy.core.getBlockWithTransactions('latest'));
        };

        getBlock();
        const interval = setInterval(getBlock, 13000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className='flex flex-col items-center w-full gap-8'>
            <BlockContainer title="Last Block Mined" block={block} isButtonVisible={true}/>
            <h2>Last Block Mined Transactions</h2>
            <Transactions block={block} />
        </div>
    )
}

export default LatestBlock