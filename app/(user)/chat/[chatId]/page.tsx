import { authOptions } from '@/auth';
import ChatInput from '@/components/ui/organisms/chat/ChatInput'
import ChatMembersBadges from '@/components/ui/organisms/chat/ChatMembersBadges';
import ChatMessages from '@/components/ui/organisms/chat/ChatMessages';
import { sortedMessagesRef } from '@/lib/converters/Messages';
import { getDocs } from 'firebase/firestore';
import { getServerSession } from 'next-auth';
import React from 'react'

type Props = {
  params:{
    chatId: string;
  }
}

const OneOnOneChatPage = async({params:{chatId}}:Props) => {
  const session = await getServerSession(authOptions);
  const initialMessages = (await getDocs(sortedMessagesRef(chatId))).docs.map((doc)=>doc.data())
  return (
    < >
        {/* Admin controls */}

        {/* chat members badge */}
        <ChatMembersBadges chatId={chatId}/>

        {/* chat messages */}
        <div className="z-10 flex-1">
          <ChatMessages
            chatId={chatId}
            session={session}
            initialMessages={initialMessages}
          />
        </div>
        {/* chat input */}
        <div className='fixed bottom-0 left-0 right-0 z-30'>
          <ChatInput chatId={chatId}/>
        </div>
    </>
  )
}

export default OneOnOneChatPage