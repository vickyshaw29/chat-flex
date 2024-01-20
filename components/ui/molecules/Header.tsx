import React from 'react'
import Logo from '../atoms/Logo'
import { DarkToggle } from './DarkToggle'
import UserBtn from './UserBtn'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'
import Link from 'next/link'
import { MessagesSquareIcon, VideoIcon } from 'lucide-react'
import ChatButton from '../atoms/ChatButton'
import SubscriptionBanner from './SubscriptionBanner'
import LanguageSelect from './LanguageSelect'

const Header = async() => {
  const session = await getServerSession(authOptions)

  return (
    <div className='sticky top-0 z-50 bg-white dark:bg-gray-900'>
        <nav className='flex flex-col items-center p-5 pl-2 mx-auto md:flex-row max-w-7xl'>
            <Logo/>
            <div className='flex items-center justify-end flex-1 space-x-4 max-md:mt-2 '>
                {/* language select */}
                <LanguageSelect/>
                {/* session part */}
                {session ? (
                  <>
                     <div className='flex items-center space-x-5'>
                      <Link href={"/chat"} prefetch={false} className='hover:text-slate-500'>
                            <MessagesSquareIcon />
                        </Link>
                        <Link href={"/videochat"} prefetch={false} className='hover:text-slate-500'>
                          <VideoIcon/>
                        </Link>
                      <ChatButton/>
                     </div>
                  </>
                ):(
                  // Pricing
                  <Link href={"/pricing"}>
                    Pricing
                  </Link>
                )}
                {/* dark mode toggle */}
                <DarkToggle/>
                <UserBtn session={session}/>
            </div>
        </nav>
        <SubscriptionBanner/>
    </div>
  )
}

export default Header