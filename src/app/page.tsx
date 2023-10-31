import LatestBlock from '@/components/LatestBlock'
import Search from '@/components/Search'

export default function Home() {
  return (
    <main className='flex flex-col items-center w-full gap-8 p-4'>
      <LatestBlock />
    </main>
  )
}
