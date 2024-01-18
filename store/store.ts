import { create } from 'zustand';
import { Subscription } from '@/types/subscription';

export type LanguageSupported = "en"|"de"|"fr"|"es"|"hi"|"ja"|"la"|"ru"|"zh"|"ar";
export const LanguageSupportedMap : Record<LanguageSupported, string> = {
    en:"English",
    de:"German",
    fr:"French",
    es:"Spanish",
    hi:"Hindi",
    ja:"Japanese",
    la:"Latin",
    ru:"Russian",
    zh:"Mandarin",
    ar:"Arabic",
}

interface SubscriptionState {
    subscription:Subscription | null | undefined;
    setSubscription: (subscription:Subscription|null)=>void;
}


/*=============================================
=            Remember to update the language store once you are done setting up your payment and product gateway !          =
=============================================*/

const LANG_IN_FREE = 2


interface LanguageState {
    language:LanguageSupported;
    setLanguage:(language:LanguageSupported)=>void;
    getLanguages:(isPro:boolean)=>LanguageSupported[];
    getNotSupportedLanguages:(isPro:boolean)=>LanguageSupported[];
}

export const useLanguageStore = create<LanguageState>((set, get) => ({
    language:'en',
    setLanguage:(language:LanguageSupported)=>set({language}),
    getLanguages:(isPro:boolean)=>{
        if(isPro) return Object.keys(LanguageSupportedMap) as LanguageSupported[];
        return Object.keys(LanguageSupportedMap)?.slice(0,LANG_IN_FREE) as LanguageSupported[];
    },
    getNotSupportedLanguages:(isPro:boolean)=>{
        if (isPro) return []; // no unsuported language for standard or premium members of the app
        return Object.keys(LanguageSupportedMap)?.slice(LANG_IN_FREE) as LanguageSupported[] 
    }

  }))


export const useSubscriptionStore = create<SubscriptionState>((set) => ({
    subscription: undefined,
    setSubscription:(subscription:Subscription|null)=>set({subscription})
  }))