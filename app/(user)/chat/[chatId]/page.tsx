import { authOptions } from '@/auth';
import ChatInput from '@/components/ui/organisms/chat/ChatInput'
import { getServerSession } from 'next-auth';
import React from 'react'

type Props = {
  params:{
    chatId: string;
  }
}

const OneOnOneChatPage = async({params:{chatId}}:Props) => {
  const session = await getServerSession(authOptions);
  return (
    <div>
        {/* Admin controls */}

        {/* chat members badge */}

        {/* chat messages */}

        {/* chat input */}
        <ChatInput chatId={chatId}/>
    </div>
  )
}

export default OneOnOneChatPage