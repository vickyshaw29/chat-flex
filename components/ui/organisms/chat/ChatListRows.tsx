"use client"

import { ChatMembers, chatMembersCollectionGroupRef } from '@/lib/converters/ChatMembers'
import { MessageSquare } from 'lucide-react'
import { useSession } from 'next-auth/react'
import React from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import ChatButton from '../../atoms/ChatButton'
import ChatListRow from './ChatListRow'

const ChatListRows = ({initialChats}:{initialChats:ChatMembers[]}) => {
  const {data:session} = useSession();

  const [members, loading, error] = useCollectionData<any>(session && chatMembersCollectionGroupRef(session.user.id!),{initialValue:initialChats})

  if(members?.length === 0){
    return (
        <div className='flex flex-col items-center justify-center pt-40 space-y-2'>
            <MessageSquare className='w-10 h-10'/>
            <h1 className='text-5xl font-extralight'>Welcome!</h1>
            <h2 className='pb-10'>Lets get started by creating your first chat!</h2>
            <ChatButton isLarge/>
        </div>
    )
  }
  return (
    <div>
        {members?.map((member)=>{
            return(
                <ChatListRow key={member?.chatId} chatId={member?.chatId}/>
            )
        })}
    </div>
  )
}

export default ChatListRows