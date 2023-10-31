import { BlockWithTransactions } from 'alchemy-sdk';
import React from 'react'
import { DataTable } from './transactions/data-table';
import { columns } from './transactions/columns';

type TransactionsProps = {
    block: BlockWithTransactions | undefined;
}

const Transactions = (props: TransactionsProps) => {
    return (
        <div className='w-full max-w-[1400px]'>
            <DataTable columns={columns} data={props.block?.transactions ? props.block.transactions : []} />
        </div>
    )
}

export default Transactions