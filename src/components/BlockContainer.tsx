"use client"
import { Block, BlockWithTransactions } from 'alchemy-sdk'
import React from 'react'
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { Skeleton } from './ui/skeleton';

type BlockProps = {
    title: string;
    block: (BlockWithTransactions | undefined) | (Block | undefined);
    isButtonVisible?: boolean;
}

const BlockContainer = (props: BlockProps) => {
    const router = useRouter();

    return (
        <section className='max-w-[1400px] w-full flex p-4 justify-center items-center bg-primary rounded-md flex-col gap-4 relative drop-shadow-xl'>
            <div className='absolute top-0 bottom-0 left-0 right-0 z-0 rounded-md isometric'></div>
            <div className='flex gap-4 items-center justify-center flex-col sm:flex-row sm:justify-between z-10 w-full max-w-[700px]'>
                <div className='flex flex-col items-center gap-2 sm:flex-row'>
                    <h1 className='text-3xl font-extrabold uppercase text-primary-foreground'>{props.title}</h1>
                    <span className='h-full p-1 px-2 text-xl rounded-md bg-accent text-accent-foreground'>
                        {props.block?.number ? props.block?.number : <Skeleton className='w-[70px] h-[24px]'/>}
                    </span>
                </div>
                <span className='text-primary-foreground'>
                    {props.block?.timestamp ? new Date(props.block?.timestamp * 1000).toLocaleString() : <Skeleton className='w-[150px] h-[24px]'/>}
                </span>
            </div>
            <div className='z-10 flex flex-col items-center justify-center w-full gap-4'>
                <span className='p-2 border border-accent rounded-md bg-primary w-full max-w-[700px] drop-shadow-lg'>
                    <span className='text-lg font-bold text-accent'>Block Hash:</span> <span className='break-words text-primary-foreground'>{props.block?.hash ? props.block?.hash : <Skeleton className='h-[24px] w-full'/>}</span>
                </span>
                <div className='flex flex-col items-center justify-center w-full gap-2'>
                    <span className='p-2 border border-accent rounded-md bg-primary w-full max-w-[700px] drop-shadow-lg'>
                        <span className='text-lg font-bold text-accent'>Miner:</span> <span className='break-words text-primary-foreground'>{props.block?.miner ? props.block?.miner : <Skeleton className='h-[24px] w-full'/>}</span>
                    </span>
                    <span className='p-2 border border-accent rounded-md bg-primary w-full max-w-[700px] drop-shadow-lg'>
                        <span className='text-lg font-bold text-accent'>Nonce:</span> <span className='break-words text-primary-foreground'>{props.block?.nonce ? props.block?.nonce : <Skeleton className='h-[24px] w-full'/>}</span>
                    </span>
                </div>
            </div>
            <div className='z-10 flex flex-wrap items-center justify-center w-full gap-4'>
                <span className='flex flex-col items-center justify-center p-2 text-center border rounded-md border-accent text-primary-foreground bg-primary drop-shadow-lg'>
                    Difficulty: <span className='font-medium text-accent'>{props.block?.difficulty! >= 0 ? props.block?.difficulty : <Skeleton className='h-[24px] w-[50px]'/>}</span>
                </span>
                <span className='flex flex-col items-center justify-center p-2 border rounded-md border-accent text-primary-foreground bg-primary drop-shadow-lg'>
                    Gas Limit: <span className='font-medium text-accent'>{props.block?.gasLimit ? props.block?.gasLimit?.toNumber().toLocaleString() : <Skeleton className='h-[24px] w-[50px]'/>}</span>
                </span>
                <span className='flex flex-col items-center justify-center p-2 border rounded-md border-accent text-primary-foreground bg-primary drop-shadow-lg'>
                    Gas Used: <span className='font-medium text-accent'>{props.block?.gasUsed ? props.block?.gasUsed?.toNumber().toLocaleString() : <Skeleton className='h-[24px] w-[50px]'/>}</span>
                </span>
            </div>
            <Button onClick={() => router.push(`/block?hash=${props.block?.hash}`)} variant={'secondary'} className={`drop-shadow-lg w-full max-w-[400px] z-10 ${props.isButtonVisible ? 'flex' : 'hidden'}`}>
                Explore Block
            </Button>
        </section>
    )
}

export default BlockContainer