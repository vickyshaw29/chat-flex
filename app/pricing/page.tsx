"use client";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import toast from 'react-hot-toast'
import { AlertCircleIcon } from "lucide-react";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase";
import { isUserSubscribed } from "@/components/ui/molecules/SubscriptionBanner";
import ManageAccountButton from "@/components/ui/molecules/ManageAccountButton";
import ManageSubscription from "@/components/ui/molecules/ManageSubscription";


const PricingPage: React.FC = () => {
  const {data:session} = useSession();
  const [loading, setLoading] = useState<boolean>(false)
  

  const subscribe = async(tier:any)=> {
    if(!session) {
      toast("Please sign in to subscribe", {
        icon:<AlertCircleIcon className="text-primary dark:text-secondary"/>
      })
      return;
    }
    setLoading(true)
    const toastId = toast.loading('Subscribing...')
    //push a ch session referent document into firestore db
    //firestore extesion on stripe will create a checkout session
    const docRef = await addDoc(collection(db, 'customers', session.user.id, 'checkout_sessions'), {
      price: tier?.productId,
      success_url:window.location.origin,
      cancel_url:window.location.origin
    })  

    //stripe extension inside the firebase will create a checkout session
    return onSnapshot(docRef, (snap)=>{
      const data = snap?.data();
      const url = data?.url;
      const error = data?.error

      if(error){
        toast?.error('Something went wrong',{
          id:toastId
        })
        setLoading(false)
      }
      if(url){
        toast.success('Redirecting to the payment page',{id:toastId})
        window?.location?.assign(url);
        setLoading(false)
      }
    })

    //redirect user to checkout page
  }

  return (
    <div className="flex h-[80vh] justify-center items-center dark:text-white">
      <div className="w-4.5/5 md:w-3/5 lg:w-2/5 xl:w-1.5/3 2xl:w-1/4 shadow-2xl dark:bg-gray-900 bg-white rounded-sm">
        <div className="">
          <Tabs defaultValue="Basic" className="pt-5 p-14 max-sm:p-5">
            <TabsList className="w-full h-[5rem] flex gap-2 border border-gray-100 dark:border-none">
              {tiers.map((tier) => (
                <TabsTrigger key={tier.id} value={tier.id} className="w-24 p-3 font-semibold rounded-sm">
                  {tier.id}
                </TabsTrigger>
              ))}
            </TabsList>
            {tiers.map((tier) =>{
              return(
                  <TabsContent key={tier.id} value={tier.id} className="p-4">
                    <div className="flex items-center justify-between mb-4">
                          <p className="text-2xl font-bold">{tier.name}</p>
                          {tier?.priceMonthly && <div className="text-2xl font-bold"> <span >{tier.priceMonthly}</span> / month</div>}
                    </div>
                    <div className="mb-4 font-semibold text-gray-600">{tier.description}</div>
                    <div className="mb-4">
                      {/* <strong className="block mb-2 text-lg">Features:</strong> */}
                      <ul className="leading-9 list-disc list-inside">
                        {tier.feature.map((feature, index) => (
                          <li key={index} className="mb-1 flex items-center text-[0.9rem] ">
                            <Checkbox className="w-6 h-6 mr-2 rounded-full" checked={true}/>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    {tier?.name !== "Basic" && (
                      // <div className="flex justify-center mt-10">
                      //  { !isSubscriptionLoading && !membership &&
                      //    <Button className="w-[400px] max-sm:w-[200px]" onClick={()=>subscribe(tier)} disabled={loading}>{
                      //     loading ? 'Loading...' : 'Subscribe'
                      //   }</Button>
                      //  }
                      //  {!isSubscriptionLoading && membership && <ManageAccountButton/>}

                      // </div>
                      <ManageSubscription loading={loading} tier={tier} onClick={()=>subscribe(tier)}/>
                    )}
                  </TabsContent>
                )
            })}
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;


const tiers = [
  {
    name: 'Basic',
    id: 'Basic',
    productId:'',
    href: '#',
    priceMonthly: null,
    description: 'Get chatting right away with anyone, anywhere',
    feature: [
      '20 messages chat limit in Chats',
      '2 Participant limit in Chat',
      '3 Chat Rooms limit',
      'Supports 2 languages',
      '48-hour support response time'
    ]
  },
  {
    name: 'Standard Membership',
    id: 'Standard',
    productId:`${process.env.NEXT_PUBLIC_API_STANDARD_ID}`,
    href: '#',
    priceMonthly: '$9.99',
    description: 'Enhanced features for a better chatting experience',
    feature: [
      'Unlimited messages in Chats',
      '5 Participant limit in Chat',
      '10 Chat Rooms limit',
      'Supports 5 languages',
      '24-hour support response time'
    ]
  },
  {
    name: 'Premium Membership',
    id: 'Premium',
    productId: `${process.env.NEXT_PUBLIC_API_PREMIUM_ID}`,
    href: '#',
    priceMonthly: '$19.99',
    description: 'Unlock premium features for an exceptional chatting experience',
    feature: [
      'Unlimited messages in Chats',
      '10 Participant limit in Chat',
      'Unlimited Chat Rooms',
      'Supports 10 languages',
      'Instant 24/7 support'
    ]
  }
];