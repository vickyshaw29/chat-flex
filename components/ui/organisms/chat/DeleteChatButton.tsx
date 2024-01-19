"use client"
import React, { useState } from "react";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../dialog";
import { Button } from "../../button";
import useAdminId from "@/lib/hooks/useAdminId";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const DeleteChatButton = ({ chatId }: { chatId: string }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const { adminId } = useAdminId({ chatId });
  const [open, setOpen] = useState(false);


  const handleDeleteChat = async()=> {
    const toastId = toast.loading("Deleting chat...")
    fetch("/api/chat/delete", {
        method:"DELETE",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify({chatId:chatId})
    }).then(()=>{
        toast.success("Deleted successfully", {id:toastId});
        router.replace("/chat")
    }).catch((err)=>{
        console.log(err,"error while deleting the chat")
        toast.error("Error while deleting the chat",{id:toastId})
        return;
    }).finally(()=>setOpen(false))
  }

  return (
    session?.user?.id === adminId && (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant={"destructive"}>Delete Chat</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              This will delete the chat for all the users!
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 space-x-2">
                <Button onClick={handleDeleteChat}>Delete</Button>
                <Button variant={"outline"} onClick={()=>setOpen(false)}>Cancel</Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  );
};

export default DeleteChatButton;
