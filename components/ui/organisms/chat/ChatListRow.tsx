"use client"
import { Message, limitedSortedMessagesRef } from '@/lib/converters/Messages'
import React from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { Skeleton } from '../../skeleton'
import { Avatar } from '../../avatar'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import CustomAvatar from '../../atoms/CustomAvatar'
import { useLanguageStore } from '@/store/store'

const ChatListRow = ({chatId}:{chatId:string}) => {
  const router = useRouter();
  const {data:session} = useSession();
  const [messages, loading, error] = useCollectionData<Message>(limitedSortedMessagesRef(chatId));
  const { language } = useLanguageStore();

  const prettyUUID =  (n = 4 )=> {
    return chatId?.substring(0,n)
  }

  const row = (message?:Message)=> {
    return(
      <div key={chatId}
        onClick={()=>router.push(`/chat/${chatId}`)}
        className='flex items-center p-5 space-x-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-700'
      >
        {/* @ts-ignore */}
        <CustomAvatar image={session?.user?.image!} name={session?.user?.name!}/>

        <div className='flex-1'>
            <p className='font-bold'>
              {!message && 'New Chat'}
              {/* @ts-ignore */}
              {message && [message?.user?.name || session?.user?.name]?.toString().split(" ")[0]}
            </p>
            <p className='text-gray-400 line-clamp-1'>
                {message?.translated?.[language]|| 'Get the conversation started...'}
            </p>
        </div>
        <div className='text-xs text-right text-gray-400'>
            <p className='mb-auto'>
                {message? new Date(message?.timestamp || "").toLocaleTimeString():"No Messages yet"}
            </p>
            <p>chat #{prettyUUID()}</p>
        </div>
      </div>
    )
  }
  return (
    <div>
      {loading && (
        <div className='flex items-center p-5 space-x-2'>
            <Skeleton className='w-12 h-12 rounded-full'/>
                <div className='flex-1 space-y-2'>
                    <Skeleton className='w-full h-4 '/>
                    <Skeleton className='w-full h-4 '/>
                </div>
        </div>
       )}
       {messages?.length ===0 && !loading && row()}
       {messages?.map((message)=>row(message))}
    </div>
  )
}

export default ChatListRow