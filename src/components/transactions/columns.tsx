import { formatEthereumAddress } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';
import { TransactionResponse } from 'alchemy-sdk';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

export const columns: ColumnDef<TransactionResponse | undefined>[] = [
    {
        accessorKey: 'nonce',
        header: 'Nonce',
    },
    {
        accessorKey: "from",
        header: "From",
        cell: ({ row }) => {
            const from = formatEthereumAddress(row.getValue('from'))
            return (
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <span>{from}</span>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>{row.getValue('from')}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            )
        }
    },
    {
        accessorKey: "to",
        header: "To",
        cell: ({ row }) => {
            const to = formatEthereumAddress(row.getValue('to'))
            return <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <span>{to}</span>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>{row.getValue('to')}</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        }
    },
    {
        accessorKey: 'gasPrice',
        header: 'Gas Price',
        cell: ({ row }) => {
            const gasPrice = Number(row.getValue('gasPrice'));
            return <span className='whitespace-nowrap'>{gasPrice.toLocaleString()} gwei</span>
        }
    },
    {
        accessorKey: "hash",
        header: "Hash",
        cell: ({ row }) => {
            const hash = formatEthereumAddress(row.getValue('hash'))
            return <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <span>{hash}</span>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>{row.getValue('hash')}</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        }
    },
    {
        accessorKey: "confirmations",
        header: "Confirmations",
    },
]