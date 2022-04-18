import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

export default function Home() {
  return (
    <div className='w-screen h-screen bg-green-100 flex justify-center items-center flex-col'>
      <span className='text-lg shadow-2xl font-medium'>
        hello!
      </span>

      <span className='text-sm shadow-2xl font-light mt-6 hover:cursor-pointer'>
        <Link href="/home-page">
          <a>enter</a>
        </Link>
      </span>
    </div>
  )
}
