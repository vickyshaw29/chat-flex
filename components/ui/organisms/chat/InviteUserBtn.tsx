"use client"
import { useSession } from 'next-auth/react';
import React, { useState } from 'react'
import * as z from 'zod'
import toast from 'react-hot-toast';
import useAdminId from '@/lib/hooks/useAdminId';
import { useSubscriptionStore } from '@/store/store';
import { useRouter } from 'next/navigation';
import {  useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../../dialog';
import { Button } from '../../button';
import { FormControl, FormField, FormItem, FormMessage } from '../../form';
import { Input } from '../../input';
import { getDocs, serverTimestamp, setDoc } from 'firebase/firestore';
import { addChatRef, chatMembersRef } from '@/lib/converters/ChatMembers';
import { getUserByEmailRef } from '@/lib/converters/User';
import { Form } from '../../form';
import ShareLinkToJoin from './ShareLinkToJoin';
import { Plus, PlusCircle } from 'lucide-react';

const formSchema = z.object({
  email:z.string().email("Please enter a valid email")
})

const InviteUserBtn = ({chatId}:{chatId:string}) => {

 
  const { data:session } = useSession();
  const { adminId } = useAdminId({chatId});
  const { subscription } = useSubscriptionStore();
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [openInviteLink, setOpenInviteLink] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver:zodResolver(formSchema),
    defaultValues:{
      email:""
    }
  })

  const onSubmit = async(values:z.infer<typeof formSchema>)=> {
      if(!session?.user?.id) return;
      const toastId = toast.loading("Sending the invite...");

      // ***************Pro stuff***************************************
      // //checking the number of users in the active chat
      // const numberOfUsersInChat = (await getDocs(chatMembersRef(chatId))).docs.map((doc)=>doc.data())?.length;
      // //checking if the user exceedes the Paid plan limit
      // const isPro = subscription?.role ==="pro" && subscription?.status === "active";
      // if(!isPro && numberOfUsersInChat>=2){
      //   toast.success("Free plan limit exceeded", {
      //     id:toastId
      //   })
      // }
      // return;
      // *********************


     //checking if the user exists(to whom the invite is being sent)
     const querySnapshot = await getDocs(getUserByEmailRef(values?.email));
     if(querySnapshot?.empty){
      toast.error("User not found, Please enter a valid email of a registered user !", {
        id:toastId
      })
     }else{
      const user = querySnapshot?.docs[0]?.data();
      await setDoc(addChatRef(chatId, user?.id), {
          userId: user?.id,
          email: user?.email!,
          timestamp: serverTimestamp(),
          chatId: chatId,
          isAdmin: false,
          image: user?.image || ""
      }).then(()=>{
        setOpen(false)
        toast.success("Added user successfully in the chat", {
          id:toastId
        });
        setOpenInviteLink(true)
      }).catch((err)=>{
        toast.error("Somethign went wrong", {id:toastId})
        setOpen(false)
      })
     }

     form.reset(); 
  }


  return (
    adminId === session?.user?.id && (
      <>
        <Dialog  open={open} onOpenChange={setOpen}> 
          <DialogTrigger asChild>
            <Button variant={"outline"}>
              <PlusCircle className='w-6 h-6 mr-2'/>
              Invite User To Chat
            </Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-md'>
              <DialogHeader>
                 <DialogTitle>Add User To Chat</DialogTitle>
                 <DialogDescription>
                    Enter the email of the user you want to invite!{" "}
                    <span className='font-bold text-primary'>(Note:They must me registered)</span>
                 </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col space-y-2'>
                    <FormField control={form.control} name='email'
                      render={({field})=>(
                        <FormItem>
                            <FormControl>
                                <Input placeholder='janedoe@gmail.com' {...field}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                      )}
                    />
                    <Button>
                      Add To Chart
                    </Button>
                </form>
              </Form>
          </DialogContent>
        </Dialog>
        <ShareLinkToJoin
          isOpen={openInviteLink}
          setIsOpen={setOpenInviteLink}
          chatId={chatId}
        />
      </>
    )
  )
}

export default InviteUserBtn