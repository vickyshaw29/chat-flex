"use client"

import { ChatMembers, chatMembersRef } from '@/lib/converters/ChatMembers'
import useAdminId from '@/lib/hooks/useAdminId'
import { Loader } from 'lucide-react'
import React from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { Badge } from '../../badge'
import CustomAvatar from '../../atoms/CustomAvatar'

const ChatMembersBadges = ({chatId}:{chatId:string}) => {
  const [members, loading, error] = useCollectionData<ChatMembers>(chatMembersRef(chatId));
  const {adminId} = useAdminId({chatId})

  if(loading && !members) return <Loader className='animate-spin'/>
  return (
    !loading && (
        <div className='p-2 m-5 border rounded-xl'>
            <div className='flex flex-wrap items-center justify-center gap-2 p-2 md:justify-start'>
                {members?.map((member)=>(
                    <Badge variant={"secondary"} key={member?.email} className='flex p-5 pl-2 pr-5 space-x-2 h-14'>
                        <div className='flex items-center space-x-2'>
                            <CustomAvatar name={member?.email} image={member?.image}/>
                        </div>
                        <div>
                            <p>{member?.email}</p>
                            {member?.userId === adminId && (
                                <p className='text-indigo-400 animate-pulse'>Admin</p>
                            )}
                        </div>
                    </Badge>
                ))}
            </div>
        </div>
    )
  )
}

export default ChatMembersBadges