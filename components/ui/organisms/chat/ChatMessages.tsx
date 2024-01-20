"use client";
import { Message, sortedMessagesRef } from "@/lib/converters/Messages";
import { useLanguageStore } from "@/store/store";
import { Session } from "inspector";
import { Loader, MessageCircleIcon } from "lucide-react";
import React, { createRef, useEffect } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import CustomAvatar from "../../atoms/CustomAvatar";

const ChatMessages = ({
  chatId,
  session,
  initialMessages,
}: {
  chatId: string;
  session: Session | any;
  initialMessages: Message[];
}) => {
  const { language } = useLanguageStore();
  const messagesEndRef = createRef<HTMLDivElement>();
  const [messages, loading, error] = useCollectionData<Message>(
    sortedMessagesRef(chatId),
    {
      initialValue: initialMessages,
    }
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, messagesEndRef]);

  return (
    <div className="p-5 pb-[5rem]">
      {!loading && messages?.length === 0 && (
        <div className="flex flex-col items-center justify-center p-20 space-y-2 text-center text-white roundex-xl bg-primary font-extralight">
          <MessageCircleIcon className="w-10 h-10" />
          <h2>
            <span>Invite a friend</span>& <span>Send your first message</span>{" "}
            below to get started!
          </h2>
          <p>AI will auto-detect and translate it all for you</p>
        </div>
      )}
      {messages?.map((message) => {
        const isSender = message?.user?.id === session?.user?.id;
        return (
          <div key={message?.id} className="flex items-end my-2">
            <div
              className={`flex flex-col relative space-y-2 p-4 w-fit line-clamp-1 mx-2 rounded-lg ${
                isSender
                  ? "ml-auto bg-[#F4F4F4] text-[#333333] rounded-br-none dark:bg-[#f8fafc] dark:text-[#0f172a]"
                  : "bg-[#F4F4F4] text-[#333333] dark:text-gray-100 dark:bg-slate-700 rounded-bl-none "
              }`}
            >
              <p
                className={`text-xs italic font-extralight line-clamp-1 ${
                  isSender ? "text-right" : "text-left"
                } `}
              >
                {message?.user?.name?.split(" ")[0]}
              </p>
              <div className="flex space-x-2">
                  <p>{message?.translated?.[language]|| message?.input}</p>
                  {!message?.translated && <Loader className="animate-spin"/>}
              </div>
            </div>
            <CustomAvatar className={`${!isSender && "-order-1"}`} image={message?.user?.image} name={message?.user?.name}/>

          </div>
        );
      })}
      <div ref={messagesEndRef}/>
    </div>
  );
};

export default ChatMessages;
