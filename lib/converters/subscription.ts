import { db } from "@/firebase";
import { Subscription } from "@/types/subscription";
import { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot, SnapshotOptions, collection } from "firebase/firestore";

const subscriptionConverter:FirestoreDataConverter<Subscription> = {
    toFirestore: function(subscription:Subscription):DocumentData {

        return {
            ...subscription
        }
    },
    fromFirestore:function(snapshot:QueryDocumentSnapshot, options:SnapshotOptions):Subscription{
        const data = snapshot.data(options);
        return {
            id:snapshot?.id,
            price:data.price,
            ...data,
        } as Subscription
    }
}


export const subscriptionRef = (userId:string)=>{
    return collection(db, "customers", userId, "subscriptions").withConverter(subscriptionConverter)
}