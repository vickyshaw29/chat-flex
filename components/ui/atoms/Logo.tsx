import Link from 'next/link'
import React from 'react'
import { AspectRatio } from '../aspect-ratio'
import Image from 'next/image'
import { AppLogo } from '@/assets'

const Logo = () => {
  return (
    <Link href={"/"} prefetch={false} className='overflow-hidden'>
        <div className='flex items-center justify-center w-72 h-14  gap-2'>
            <Image src={AppLogo} priority alt='logo' className='dark:filter'/>
            <h1 className='font-semibold text-[1.2rem]'>Chat Flex</h1>
        </div>
    </Link>
  )
}

export default Logo