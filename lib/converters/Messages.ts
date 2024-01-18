import { db } from "@/firebase";
import { LanguageSupported } from "@/store/store";
import { Subscription } from "@/types/subscription";
import { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot, SnapshotOptions, collection, collectionGroup, doc, limit, orderBy, query, where } from "firebase/firestore";

export interface User {
    id: string;
    name: string;
    email: string;
    image: string
}

export interface Message {
    id?: string;
    input: string;
    timestamp: Date | null;
    user: User;
    translated?:{
        [k in LanguageSupported]?:string;
    }
}

const messageConverter:FirestoreDataConverter<Message> = {
    toFirestore: function(message:Message):DocumentData {
        return {
            // id: message?.id,
            input: message?.input,
            timestamp: message?.timestamp,
            // translated: message?.translated,
            user: message?.user,
            
        }
    },
    fromFirestore:function(snapshot:QueryDocumentSnapshot, options:SnapshotOptions):Message{
        const data = snapshot.data(options);

        return {
            id: snapshot?.id,
            input: data?.input,
            timestamp: data?.timestamp?.toDate(),
            translated: data?.translated,
            user: data?.user
        }
    }
}


export const messagesRef = (chatId: string)=>{
    return collection(db, "chats", chatId, "messages").withConverter(messageConverter)
}

export const limitedMessagesRef = (chatId: string)=>{
    return query(messagesRef(chatId), limit(25))
}

export const sortedMessagesRef = (chatId: string)=>{
    return query(messagesRef(chatId), orderBy("timestamp", "asc"))
}

export const limitedSortedMessagesRef = (chatId: string)=>{
    return query(messagesRef(chatId), limit(1) ,orderBy("timestamp", "asc"))
}
