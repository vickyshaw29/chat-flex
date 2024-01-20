"use client"

import { ChatMembers, chatMembersRef, deleteChatMemberRef } from '@/lib/converters/ChatMembers'
import useAdminId from '@/lib/hooks/useAdminId'
import { DeleteIcon, Loader } from 'lucide-react'
import React from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { Badge } from '../../badge'
import CustomAvatar from '../../atoms/CustomAvatar'
import toast from 'react-hot-toast'

const ChatMembersBadges = ({chatId}:{chatId:string}) => {
  const [members, loading, error] = useCollectionData<ChatMembers>(chatMembersRef(chatId));
  const {adminId} = useAdminId({chatId})

  const deleteUserFromTheChat = async (userId: string) => {
    const toastId = toast.loading("Removing member from the chat...")
    try {
      await deleteChatMemberRef(chatId, userId);
      toast.success("Removed successfully!", {id:toastId})
      
      console.log(`User with userId ${userId} deleted from the chat ${chatId}`);
    } catch (error) {
      console.error('Error deleting user from the chat:', error);
      toast.error("Something went wrong", {id:toastId})
    }
  };

  if(loading && !members) return <Loader className='animate-spin'/>
  return (
    !loading && (
        <div className='p-2 m-5 border rounded-xl'>
            <div className='flex flex-wrap items-center justify-center gap-2 p-2 md:justify-start'>
                {members?.map((member)=>(
                    <Badge variant={"secondary"} key={member?.email} className='flex p-5 pl-2 pr-5 space-x-3 h-14'>
                        <div className='flex items-center space-x-2'>
                            <CustomAvatar name={member?.email} image={member?.image}/>
                        </div>
                        <div>
                            <p>{member?.email}</p>
                            {member?.userId === adminId && (
                                <p className='text-indigo-400 animate-pulse'>Admin</p>
                            )}
                        </div>
                       {member?.userId!==adminId && (
                         <div onClick={()=>deleteUserFromTheChat(member?.userId)}>
                            <DeleteIcon className='cursor-pointer text-primary hover:text-slate-600'/>
                         </div>
                       )}
                    </Badge>
                ))}
            </div>
        </div>
    )
  )
}

export default ChatMembersBadges