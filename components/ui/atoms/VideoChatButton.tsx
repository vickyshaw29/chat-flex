"use client"

import { VideoIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import toast from 'react-hot-toast'

const VideoChatButton = () => {
  return (
    <Link href={""} prefetch={false} className='hover:text-slate-500' onClick={()=>toast.success("Video chat will be available soon!")}>
    <VideoIcon/>
  </Link>
  )
}

export default VideoChatButton