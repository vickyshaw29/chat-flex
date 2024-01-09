"use client";
import React from "react";
import PricingCard from "@/components/ui/atoms/PricingCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button";


const PricingPage: React.FC = () => {
  const tiers = [
    {
      name: 'Basic',
      id: 'basic',
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
      name: 'Standard',
      id: 'standard',
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
      name: 'Premium',
      id: 'premium',
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

  return (
    <div className="flex h-[80vh] justify-center items-center dark:text-white">
      <div className="w-4.5/5 md:w-3/5 lg:w-2/5 xl:w-1.5/3 2xl:w-1/4 shadow-md dark:bg-gray-900 bg-white rounded-sm">
        <div className="">
          <Tabs defaultValue="basic" className="p-14 max-sm:p-5 pt-5">
            <TabsList className="w-full h-[5rem] flex gap-2 border border-gray-100 dark:border-none">
              {tiers.map((tier) => (
                <TabsTrigger key={tier.id} value={tier.id} className="p-3 rounded-sm w-24 font-semibold">
                  {tier.name}
                </TabsTrigger>
              ))}
            </TabsList>
            {tiers.map((tier) => (
              <TabsContent key={tier.id} value={tier.id} className="p-4">
                <div className="text-lg font-semibold text-gray-400 flex justify-between mb-4">
                      <div>{tier.name}</div>
                      {tier?.priceMonthly && <div> <span className="text-xl font-semibold">{tier.priceMonthly}</span> / month</div>}
                </div>
                <div className="text-gray-600 mb-4">{tier.description}</div>
                <div className="mb-4">
                  {/* <strong className="block text-lg mb-2">Features:</strong> */}
                  <ul className="list-disc list-inside leading-9">
                    {tier.feature.map((feature, index) => (
                      <li key={index} className="mb-1 flex items-center">
                        <Checkbox className="mr-2 rounded-full w-6 h-6" checked={true}/>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex justify-center mt-10">
                  <Button className="w-[200px]">Subscribe</Button>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
