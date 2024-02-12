"use client"

import { useSubscriptionStore } from "@/store/store";
import { useEffect, useState } from "react";

export const useIsUserSubscribed = ()=> {
    const [isSubscriptionLoading, setIsSubscriptionLoading] = useState<boolean>(true)
    const { subscription } = useSubscriptionStore();
    const [membership, setMembership] = useState<string>("")
  
  
    useEffect(()=>{
      if(Object?.keys(subscription || {})?.length){
        console.log({subscription})
          //@ts-ignore
          setMembership(subscription?.items?.[0]?.price?.product?.name)
  
          setIsSubscriptionLoading(false)
      }setIsSubscriptionLoading(false)
      // return()=>setIsSubscriptionLoading(true)
    },[subscription])
    return {subscription, membership, isSubscriptionLoading}
  }