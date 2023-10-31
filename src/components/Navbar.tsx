import React from 'react'
import { ModeToggle } from './ThemeToggler'
import Link from 'next/link'
import { Blocks } from 'lucide-react'

type Props = {}

const Navbar = (props: Props) => {
  return (
    <nav className='w-full fixed top-0 flex items-center justify-between p-4 z-50 backdrop-blur-xl'>
      <div className='flex gap-1'>
        <Blocks className='text-primary'/>
        <Link href="/" className='font-extrabold text-accent'>ETH EXPLORER</Link>
      </div>
      <ModeToggle />
    </nav>
  )
}

export default Navbar