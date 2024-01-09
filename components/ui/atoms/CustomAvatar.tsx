import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import React from "react";
import Image from 'next/image'

const CustomAvatar = ({name, image,className}:{name:string, image:string, className?:string}) => {
  return (
    <Avatar className={cn('bg-white text-black', className)}>
      {image && (
            <Image
                src={image}
                alt={name}
                height={40}
                width={40}
                className="rounded-full"
            />
      )}
      <AvatarFallback className="dark:bg-white dark:text-black ">{
            name?.split(" ")?.map((n)=>n[0])?.join("")
        }</AvatarFallback>
    </Avatar>
  );
};

export default CustomAvatar;
