"use client"
import { useSession } from "next-auth/react";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../../form";
import { Input } from "../../input";
import { User, limitedMessagesRef, messagesRef } from '../../../../lib/converters/Messages'
import { addDoc, getDocs, serverTimestamp } from "firebase/firestore";
import { Button } from "../../button";
import { useSubscriptionStore } from "@/store/store";
import toast from "react-hot-toast";

const formSchema = z.object({
  input: z.string().max(1000),
});

const ChatInput = ({ chatId }: { chatId: string }) => {
  const { data: session } = useSession();
  const { subscription } = useSubscriptionStore();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      input: "",
    },
  });

  const onSubmit = async(values:z.infer<typeof formSchema>)=>{
    const tempInput = values?.input?.trim();
    form.reset();
    if(values?.input?.length === 0){
        return;
    }
    if(!session?.user){
        return;
    }

    // check if the user is standard or premium and limit creating a new chat

    // const messages = (await getDocs(limitedMessagesRef(chatId))).docs?.map((d)=>d.data())?.length;
    // const isPro = subscription?.role === "pro" && subscription?.status === "active";
    // if(!isPro && messages > 20){
    //     toast.custom((t) => (
    //         <div>
    //           <div>
    //             Upgrade to pro{' '}
    //             <span
    //               className="text-blue-500 underline cursor-pointer"
    //               onClick={() => {
    //                 toast.dismiss(t.id); // Dismiss the current toast
    //                 // Redirect the user to /pricing
    //                 // You may use react-router-dom or Next.js Link here
    //                 window.location.href = '/pricing';
    //               }}
    //             >
    //               here
    //             </span>
    //           </div>
    //         </div>
    //       ), {
    //         id: 'free-plan-limit-exceeded',
    //         duration: 5000, // Adjust the duration as needed
    //       });
    // }
    
    // 
    
    const userToStore: User = {
        id: session?.user?.id,
        // @ts-ignore
        name: session?.user?.name,
        // @ts-ignore
        email: session?.user?.email,
        // @ts-ignore
        image: session?.user?.image,
    }   

    addDoc(messagesRef(chatId), {
        input:tempInput,
        timestamp: serverTimestamp(),
        user:userToStore
    })
    form.reset();
  }

  return (
    <div className="w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex max-w-4xl p-2 mx-auto space-x-2 bg-white border rounded-t-2xl dark:bg-slate-800"
        >
          <FormField
            control={form.control}
            name="input"
            render={({ field }) => {
              return (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input
                      className="bg-transparent border-none dark:placeholder:text-white/70"
                      placeholder="Enter message..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              );
            }}
          />
          <Button type="submit">
            Send
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ChatInput;
