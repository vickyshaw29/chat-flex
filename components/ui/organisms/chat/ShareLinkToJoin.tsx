import React, { Dispatch, SetStateAction, useState } from 'react'
import toast from 'react-hot-toast'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../../dialog';
import { Button } from '../../button';
import { Copy } from 'lucide-react';
import { Label } from '../../label';
import { Input } from '../../input';

const ShareLinkToJoin = ({isOpen,setIsOpen, chatId}:{isOpen:boolean, chatId:string, setIsOpen:Dispatch<SetStateAction<boolean>>}) => {
  const [open, setOpen] = useState(false);
  const host = window.location.host;
  const linkToChat = process.env.NODE_ENV === "development" ? `http://${host}/chat/${chatId}`:`https://${host}/chat/${chatId}`;

  const copyLink = async()=> {
    const toastId = toast.loading("Copying text")
    try {
        await navigator.clipboard.writeText(linkToChat);
        toast.success("link copied successfully", {id:toastId});

    } catch (error) {
        toast.error("Failed to copy link", {id:toastId})
    }
  }

  return (
   <Dialog open={open} onOpenChange={(open)=>setOpen(open)} defaultOpen={open}>
        <DialogTrigger asChild>
            <Button variant={"outline"}>
                <Copy className='mr-2'/>
                Share Link
            </Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-sm'>
            <DialogHeader>
                <DialogTitle>Share link</DialogTitle>
                <DialogDescription>
                    Any user who has been{" "}<span className='font-bold text-primary'>granted access</span>{" "}
                    can use this link
                </DialogDescription>
            </DialogHeader>
            <div className='flex items-center space-x-2'>
                <div className='grid flex-1 gap-2'>
                    <Label htmlFor='link' className='sr-only'>Link</Label>
                    <Input id="link" defaultValue={linkToChat} readOnly/>
                </div>
                <Button type='submit' size={"sm"} onClick={copyLink} className='px-3'>
                    <span className='sr-only'>Copy</span>
                    <Copy className='w-4 h-4'/>
                </Button>
            </div>
            <DialogFooter className='sm:justify-start'>
                <DialogClose asChild>
                    <Button type='button'>
                        Close
                    </Button>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
   </Dialog>
  )
}

export default ShareLinkToJoin