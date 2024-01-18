"use client"
import { useSubscriptionStore } from '@/store/store'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { Button } from '../button';

const SubscriptionBanner = () => {
    const router = useRouter();
    const { subscription, membership, isSubscriptionLoading } = isUserSubscribed()
    if (isSubscriptionLoading || membership) return null

  return (
    <Button style={{width:'100%', borderRadius:0}} onClick={()=>router.push("/pricing")}>Upgrade to Standard or Premium to get all features!</Button>
  )
}

export default SubscriptionBanner


export const isUserSubscribed = ()=> {
  const [isSubscriptionLoading, setIsSubscriptionLoading] = useState<boolean>(true)
  const { subscription } = useSubscriptionStore();
  const [membership, setMembership] = useState<string>("")


  useEffect(()=>{
    if(Object?.keys(subscription || {})?.length){
        //@ts-ignore
        setMembership(subscription?.items?.[0]?.price?.product?.name)

        setIsSubscriptionLoading(false)
    }
    return()=>setIsSubscriptionLoading(true)
  },[subscription])
  return {subscription, membership, isSubscriptionLoading}
}