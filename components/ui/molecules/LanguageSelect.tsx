"use client"
import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LanguageSupported, LanguageSupportedMap, useLanguageStore, useSubscriptionStore } from "@/store/store";
import { usePathname } from "next/navigation";
import Link from "next/link";

const LanguageSelect = () => {
  const {language, setLanguage, getLanguages, getNotSupportedLanguages} = useLanguageStore();
  
  const {subscription} = useSubscriptionStore();
//   const isPro = subscription?.role === "pro" && subscription?.status === "active";
  const isPro = true;
  const pathName = usePathname();
  const isChatPage = pathName?.includes("/chat")

  return isChatPage && (
    <Select onValueChange={(value:LanguageSupported)=>setLanguage(value)} >
      <SelectTrigger className="sm:w-[180px] w-auto">
        <SelectValue placeholder={LanguageSupportedMap[language]} />
      </SelectTrigger>
      <SelectContent>
        {/* {subscription === undefined && <Loader className="animate-pulse"/>} */}
        <SelectGroup>
          <SelectLabel>Select Language</SelectLabel>
          {getLanguages(isPro)?.map((language)=>(
                <SelectItem key={language} value={language}>{LanguageSupportedMap[language]}</SelectItem>
          ))}
          {getNotSupportedLanguages(isPro)?.map((language)=>(
            <Link href={"/pricing"} key={language} prefetch={false}>
                <SelectItem disabled className="py-2 my-1 text-gray-500 bg-gray-300/50 dark:text-white" key={language} value={language}>{LanguageSupportedMap[language]} (PRO)</SelectItem>
            </Link>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default LanguageSelect;
