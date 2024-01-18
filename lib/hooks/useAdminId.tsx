import { getDocs } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { chatMemberAdminRef } from '../converters/ChatMembers'

const useAdminId = ({chatId}:{chatId:string}) => {
  const [adminId, setAdminId] = useState<string>("")

  useEffect(()=>{
    const fetchAdminStatus = async()=>{
        const adminId = (await getDocs(chatMemberAdminRef(chatId))).docs?.map((doc)=>doc?.id)[0];

        setAdminId(adminId)
    }
    fetchAdminStatus();
  },[chatId])
  
  return { adminId }
}

export default useAdminId