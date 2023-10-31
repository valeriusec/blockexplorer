"use client"
import BlockContainer from '@/components/BlockContainer'
import Transactions from '@/components/Transactions'
import { Button } from '@/components/ui/button'
import { Alchemy, Block, BlockTag, BlockWithTransactions, Network, TransactionResponse } from 'alchemy-sdk'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import React from 'react'

type Props = {}

const config = {
    apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
}

const alchemy = new Alchemy(config);

const TransactionPage = (props: Props) => {
    const searchParams = useSearchParams();
    const hash: any = searchParams.get('hash');
    const [transaction, setTransaction] = React.useState<TransactionResponse | null>();
    const [isLoading, setIsLoading] = React.useState<boolean>(true)
    const router = useRouter();

    React.useEffect(() => {
        const getTransaction = async () => {
            try {
                setTransaction(await alchemy.core.getTransaction(hash));
                setIsLoading(false)
            } catch (error) {
                setIsLoading(false)
            }
        };
        getTransaction();
    }, [hash]);

    const renderPage = () => {
        if (transaction && !isLoading) {
            return (
                <section className='flex justify-center w-full p-4'>
                    <div className='w-full max-w-[1400px] flex flex-col gap-4 items-center'>
                        <h1>Transaction</h1>
                        <div className="w-full my-6 overflow-y-auto">
                            <table className="w-full">
                                <tbody>
                                    <tr className="p-0 m-0 border-t even:bg-muted">
                                        <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                                            Transaction Hash
                                        </td>
                                        <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                                            {transaction?.hash}
                                        </td>
                                    </tr>
                                    <tr className="p-0 m-0 border-t even:bg-muted">
                                        <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                                            Block Hash
                                        </td>
                                        <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                                            {transaction?.blockHash}
                                        </td>
                                    </tr>
                                    <tr className="p-0 m-0 border-t even:bg-muted">
                                        <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                                            From
                                        </td>
                                        <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                                            {transaction?.from}
                                        </td>
                                    </tr>
                                    <tr className="p-0 m-0 border-t even:bg-muted">
                                        <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                                            To
                                        </td>
                                        <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                                            {transaction?.to}
                                        </td>
                                    </tr>
                                    <tr className="p-0 m-0 border-t even:bg-muted">
                                        <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                                            Confirmations
                                        </td>
                                        <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                                            {transaction?.confirmations}
                                        </td>
                                    </tr>
                                    <tr className="p-0 m-0 border-t even:bg-muted">
                                        <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                                            Nonce
                                        </td>
                                        <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                                            {transaction?.nonce}
                                        </td>
                                    </tr>
                                    <tr className="p-0 m-0 border-t even:bg-muted">
                                        <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                                            Gas Limit
                                        </td>
                                        <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                                            {transaction?.gasLimit.toNumber().toLocaleString()} gwei
                                        </td>
                                    </tr>
                                    <tr className="p-0 m-0 border-t even:bg-muted">
                                        <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                                            Gas Price
                                        </td>
                                        <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                                            {transaction?.gasPrice?.toNumber().toLocaleString()} gwei
                                        </td>
                                    </tr>
                                    <tr className="p-0 m-0 border-t even:bg-muted">
                                        <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                                            Max Fee
                                        </td>
                                        <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                                            {transaction?.maxFeePerGas?.toNumber().toLocaleString()} gwei
                                        </td>
                                    </tr>
                                    <tr className="p-0 m-0 border-t even:bg-muted">
                                        <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                                            Max Priority Fee
                                        </td>
                                        <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                                            {transaction?.maxPriorityFeePerGas?.toNumber().toLocaleString()} gwei
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <Button onClick={() => router.push(`/block?hash=${transaction?.blockHash}`)} className={`drop-shadow-lg w-full max-w-[400px] z-10`}>
                            Explore Block
                        </Button>
                    </div>
                </section>
            )
        } else if (!transaction && !isLoading) {
            return (
                <div className='flex items-center justify-center w-full h-full'>
                    <h3>
                        Transaction Not Found
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

export default TransactionPage