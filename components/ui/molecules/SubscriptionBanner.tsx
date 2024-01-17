"use client"
import { useSubscriptionStore } from '@/store/store'
import { useRouter } from 'next/navigation';
import React from 'react'
import { Button } from '../button';

const SubscriptionBanner = () => {
    const router = useRouter();
    const { subscription, subscriptionProduct } = isUserSubscribed()
    if (subscription === undefined || subscriptionProduct) return null

  return (
    <Button style={{width:'100%', borderRadius:0}} onClick={()=>router.push("/pricing")}>Upgrade to Standard or Premium to get all features!</Button>
  )
}

export default SubscriptionBanner


export const isUserSubscribed = ()=> {
  const { subscription } = useSubscriptionStore();
  //@ts-ignore
  const subscriptionProduct = subscription?.items?.[0]?.price?.product?.name
  
  return {subscription, subscriptionProduct}
}