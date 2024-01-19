import React from 'react'
import InviteUserBtn from './InviteUserBtn'
import DeleteChatButton from './DeleteChatButton'

const ChatAdminControls = ({chatId}:{chatId:string}) => {
  return (
    <div className='flex justify-end m-5 mb-0 space-x-2'>
        <InviteUserBtn chatId={chatId}/>
        <DeleteChatButton chatId={chatId}/>
    </div>
  )
}

export default ChatAdminControls