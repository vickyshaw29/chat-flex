import React from "react";
import { Button } from "../button";
import { generatePortalLink } from "@/actions/generatePortalLink";

const ManageAccountButton: React.FC<ManageAccountButtonType> = ({
  tier,
  membership,
  onClick
}) => {
  if(tier?.name === membership){
    return <form action={generatePortalLink}>
      <Button className="w-[400px] max-sm:w-[200px]">Manage Account</Button>
    </form>;
  }
  return <Button className="w-[400px] max-sm:w-[200px]" onClick={onClick}>Subscribe</Button>;
};

export default ManageAccountButton;

type ManageAccountButtonType = {
  tier: any;
  membership: string;
  onClick:any
};
