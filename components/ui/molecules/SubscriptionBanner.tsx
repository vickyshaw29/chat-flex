"use client"
import { useSubscriptionStore } from '@/store/store'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { Button } from '../button';
import {  useIsUserSubscribed } from '@/lib/hooks/useIsUserSubscribed';

const SubscriptionBanner = () => {
    const router = useRouter();
    const { subscription, membership, isSubscriptionLoading } = useIsUserSubscribed()
    if (isSubscriptionLoading || membership) return null

  return (
    <Button style={{width:'100%', borderRadius:0}} onClick={()=>router.push("/pricing")}>Upgrade to Standard or Premium to get all features!</Button>
  )
}

export default SubscriptionBanner

