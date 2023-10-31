"use client"
import { SearchIcon } from 'lucide-react'
import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Utils } from 'alchemy-sdk'
import { useRouter } from 'next/navigation'

type Props = {}

const Search = (props: Props) => {
    const [mode, setMode] = React.useState<string>('block');
    const [isValid, setIsValid] = React.useState<boolean>(false)
    const [value, setValue] = React.useState<string>('')
    const router = useRouter();

    const handleChange = (value: string) => {
        let isHex = Utils.isHexString(value);
        setIsValid(isHex);
        setValue(value);
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(mode === 'block' && isValid) {
            router.push(`/block?hash=${value}`)
        } else if(mode === 'transaction' && isValid) {
            router.push(`/transaction?hash=${value}`)
        }
    }

    return (
        <div className='flex justify-center w-full p-4'>    
        <div className='flex flex-col w-full gap-2 max-w-[1400px] justify-center items-center rounded-xl relative bg-primary p-4'>
            <div className='absolute top-0 bottom-0 left-0 right-0 z-0 isometric rounded-xl' />
            <div className='z-10 flex flex-col items-center justify-center w-full gap-2 sm:flex-row'>
                <span className="flex items-center gap-1 text-lg font-medium text-primary-foreground"><SearchIcon className='w-6 h-6' />Search by</span>
                <Tabs defaultValue="block">
                    <TabsList>
                        <TabsTrigger onClick={() => setMode('block')} value="block">Block Hash</TabsTrigger>
                        <TabsTrigger
                            onClick={() => setMode('transaction')}
                            value="transaction">Transaction Hash</TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>
            <form onSubmit={(e) => handleSubmit(e)} className='w-full max-w-[700px] z-10 flex flex-col sm:flex-row gap-1'>
                <div className='flex flex-col w-full gap-1'>
                    <Input onChange={(e) => handleChange(e.target.value)} placeholder={`${mode === 'block' ? 'Enter Block Hash ex: "0x5d5d8...31vd2"' : 'Enter Transaction Hash ex: "0x1f3f8...84e94"'}`} className={`${!isValid && value !== '' ? '!ring-destructive !text-destructive' : ''}`}/>
                    {!isValid && value !== '' && <span className='font-bold text-destructive'>
                        {mode === 'block' ? 'Invalid Block Hash' : 'Invalid Transaction Hash'}
                    </span>}
                </div>
                <Button disabled={!isValid || value === ''} variant="secondary" className='w-full sm:w-fit'>
                    {mode === 'block' ? 'Search Block' : 'Search Transaction'}
                </Button>
            </form>
        </div>
        </div>
    )
}

export default Search