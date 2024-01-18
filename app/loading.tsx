import { Loader } from 'lucide-react'
import React from 'react'

const Loading = () => {
  return (
    <LoadingSpinner/>
  )
}

export default Loading

const LoadingSpinner = ()=> {

    return(
        <div className='flex items-center justify-center h-[500px]'>
            <Loader className='text-2xl animate-spin text-primary' size={40}/>
        </div>
    )
}