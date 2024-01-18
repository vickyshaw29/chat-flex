import { ChatList } from '@/components/ui/organisms'
import React from 'react'

const ChatPage:React.FC<ChatPageProps> = ({params, searchParams:{ error }}) => {
  return (
    <div>
        {/* chat permission chat */}

        {/* chatList */}
        <ChatList/>
    </div>
  )
}

export default ChatPage

type ChatPageProps = {
    params:{};
    searchParams:{
        error: string;
    }
}