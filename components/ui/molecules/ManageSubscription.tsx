"use client";
import React from "react";
import { Button } from "../button";
import { isUserSubscribed } from "./SubscriptionBanner";
import { Loader } from "lucide-react";
import ManageAccountButton from "./ManageAccountButton";

const ManageSubscription: React.FC<ManageAccountButtonType> = ({
  loading,
  tier,
  onClick,
}) => {
  const { membership, isSubscriptionLoading } = isUserSubscribed();
  if (isSubscriptionLoading)
    return (
      <div className="flex justify-center mt-10">
        <Button className="w-[400px] max-sm:w-[200px]" disabled>
          <Loader className="animate-spin" />
        </Button>
      </div>
    );

  return (
    <div className="flex justify-center mt-10">
      {!membership && (
        <Button
        className="w-[400px] max-sm:w-[200px]"
        onClick={onClick}
        disabled={loading}
      >
        {loading ? "Loading..." : "Subscribe"}
      </Button>
      )}
     {membership && <ManageAccountButton tier={tier} membership={membership} onClick={onClick}/>}
    </div>
  );
};

export default ManageSubscription;

type ManageAccountButtonType = {
  loading: boolean;
  tier: any;
  onClick: any;
};
