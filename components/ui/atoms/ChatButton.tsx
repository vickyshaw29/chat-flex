'use client'
import React from 'react'
import { Button } from '../button'
import { MessageSquarePlusIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'


const ChatButton = () => {
  const router = useRouter()
  const createChat = async()=> {
    router.push(`/chat/abc`)
  }
  return (
    <Button variant={"ghost"} onClick={createChat}>
        <MessageSquarePlusIcon/>
    </Button>
  )
}

export default ChatButton