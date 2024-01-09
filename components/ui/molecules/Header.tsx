import React from 'react'
import Logo from '../atoms/Logo'
import { DarkToggle } from './DarkToggle'
import UserBtn from './UserBtn'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'
import Link from 'next/link'
import { MessagesSquareIcon } from 'lucide-react'
import ChatButton from '../atoms/ChatButton'

const Header = async() => {
  const session = await getServerSession(authOptions)

  return (
    <div className='sticky top-0 z-50'>
        <nav className='flex flex-col sm:flex-row items-center p-5 pl-2  max-w-7xl mx-auto'>
            <Logo/>
            <div className='flex-1 flex items-center justify-end space-x-4'>
                {/* lang select */}

                {/* session part */}
                {session ? (
                  <>
                      <Link href={"/chat"} prefetch={false}>
                          <MessagesSquareIcon />
                      </Link>
                      <ChatButton/>
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
    </div>
  )
}

export default Header