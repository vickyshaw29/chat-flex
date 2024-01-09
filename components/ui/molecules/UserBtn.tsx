"use client"

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CustomAvatar from "../atoms/CustomAvatar";
import { Session } from "next-auth";
import { Button } from "../button";
import { signIn, signOut } from "next-auth/react";

const UserBtn = ({session}:{session:Session|null}) => {
  if(session === null){
    return(
      <Button onClick={()=>signIn()} variant={"outline"}>
        Sign In
      </Button>
    )
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
          <CustomAvatar image={session?.user?.image !} name={session?.user?.name!}/>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={()=>signOut()}>SignOut</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserBtn;
