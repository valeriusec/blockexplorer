import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import Navbar from '@/components/Navbar'
import Search from '@/components/Search'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Ethereum Block Explorer',
  description: 'An Ethereum Block Explorer Application built using Next.js 14, Tailwind CSS, Shadcnui, and the Alchemy SDK for Alchemy University. Explore Ethereum Mainnet blocks and transactions effortlessly.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class"
          defaultTheme="system"
          enableSystem>
          <Navbar />
            <div className='h-[70px]'></div>
            <Search />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
