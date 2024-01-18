'use client'
import React, { useState } from 'react'
import { Button } from '../button'
import { MessageSquarePlusIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useSubscriptionStore } from '@/store/store'
import toast from 'react-hot-toast'
import { v4 as uuidv4 } from 'uuid'
import { serverTimestamp, setDoc } from 'firebase/firestore'
import { addChatRef } from '@/lib/converters/ChatMembers'

const ChatButton = ({isLarge}:{isLarge?:boolean}) => {
  const {data:session} = useSession<any>();
  const { subscription } = useSubscriptionStore();
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()
  const createChat = async()=> {
    if(!session?.user?.id) return ;
    setLoading(true)
    const toastId = toast.loading('creating a new chat...');
    //check if the user is standard or premium and limit creating chat accordingly

    const chatId = uuidv4();
    await setDoc(addChatRef(chatId, session?.user?.id), {
      userId: session.user.id!,
      //@ts-ignore
      email: session.user?.email!,
      timestamp: serverTimestamp(),
      isAdmin: true,
      chatId: chatId,
      //@ts-ignore
      image: session.user.image!
    }).then(()=>{
      toast.success("created successfully", {
        id:toastId
      });
      router.push(`/chat/${chatId}`)

    }).catch((err)=>console.warn(err))

  }

  if(isLarge){
    return(
      <div>
        <Button variant={"default"} onClick={createChat}>
            Create a new chart
        </Button>
      </div>
    )
  }

  return (
    <Button variant={"ghost"} onClick={createChat}>
        <MessageSquarePlusIcon/>
    </Button>
  )
}

export default ChatButton