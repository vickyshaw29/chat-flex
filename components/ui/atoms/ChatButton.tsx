"use client";
import React, { useState } from "react";
import { Button } from "../button";
import { MessageSquarePlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import { getDocs, serverTimestamp, setDoc } from "firebase/firestore";
import { addChatRef, chatMembersCollectionGroupRef } from "@/lib/converters/ChatMembers";
import { useIsUserSubscribed } from "@/lib/hooks/useIsUserSubscribed";

const ChatButton = ({ isLarge }: { isLarge?: boolean }) => {
  const { data: session } = useSession<any>();
  const { membership, isSubscriptionLoading, subscription } = useIsUserSubscribed();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const createChat = async () => {
    if (!session?.user?.id) return;
    setLoading(true);
    const toastId = toast.loading("creating a new chat...");
    //checking if the user is standard or premium and limit creating chat accordingly

    const numberOfChats = (await getDocs(chatMembersCollectionGroupRef(session?.user?.id)))?.docs?.map((doc)=>doc?.data())?.length
    
    const isPro:any = !isSubscriptionLoading && membership;

    console.log({numberOfChats, isPro, subscription:subscription?.status})
    if(subscription?.status !=="active" &&isPro !== "Premium Membership" && numberOfChats > 2){
      toast.custom((t) => (
        <div className="px-6 py-2 text-center text-white rounded-md bg-primary dark:text-secondary">
          Free plan limit exceeded
          <div>
            Upgrade to pro{' '}
            <span
              className="ml-1 text-blue-500 underline cursor-pointer"
              onClick={() => {
                toast.dismiss(t.id); // Dismiss the current toast
                // Redirect the user to /pricing
                // You may use react-router-dom or Next.js Link here
                window.location.href = '/pricing';
              }}
            >
              here
            </span>
          </div>
        </div>
      ), {
        id: 'free-plan-limit-exceeded',
        duration: 3000, // Adjust the duration as needed
      });

      toast.dismiss(toastId)
      return;
    }

    const chatId = uuidv4();
    await setDoc(addChatRef(chatId, session?.user?.id), {
      userId: session.user.id!,
      //@ts-ignore
      email: session.user?.email!,
      timestamp: serverTimestamp(),
      isAdmin: true,
      chatId: chatId,
      //@ts-ignore
      image: session.user.image!,
    })
      .then(() => {
        toast.success("created successfully", {
          id: toastId,
        });
        router.push(`/chat/${chatId}`);
      })
      .catch((err) => console.warn(err));
  };


  if (isLarge) {
    return (
      <div>
        <Button variant={"default"} onClick={createChat}>
          Create a new chart
        </Button>
      </div>
    );
  }

  return (
      //{/* **************************Voice Chat*************************** */}
      <div onClick={createChat} className='cursor-pointer hover:text-slate-500'>
        <MessageSquarePlusIcon />
      </div>
  );
};

export default ChatButton;
