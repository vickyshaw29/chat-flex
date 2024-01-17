import { DocumentData, DocumentReference, Timestamp } from 'firebase/firestore'
import Stripe from 'stripe'

export interface Subscription {
    /** id of the subscription */
    id?:string;
    
    /** Metadata of the subscription */
    metadata:{
        [name:string]:string
    };
    stripeLink:string;
    role:string | null
    quantity: number;
    items:Stripe.SubscriptionItem[];
    product:DocumentReference<DocumentData>;
    price:DocumentReference<DocumentData>;
    /** Array of the price refrence */
    prices: Array<DocumentReference<DocumentData>>;
    /** Payment method of the current subscription */
    payment_method?:string;

    /**  */
    latest_invoice?:string;

    /** the status of the subscription object */
    status:'active'|'canceled'|'icomplete'|'incomplete_expired'|'past_due'|'trialing'|'unpaid';

    /** If true subscription has been cancelled by the user */
    cancel_at_period_end:boolean;

    /** Object creation time(subscription) */
    created:Timestamp;

    /** Start of the current period that the subscription has been invoiced for */
    current_period_start:Timestamp;

    /** End of the current period that the subscription has been invoiced for  */
    current_period_end:Timestamp;

    /** if the subscription has ended the timestamp of the date ended */
    ended_at: Timestamp | null;

    /** If the subscription has been caneled the, cancel time of that subscription */
    canceled_at: Timestamp | null;

    /** If the subscription has the trial, the beginning of that trial */
    trial_start: Timestamp | null;
    
    /** If the subscription has the trial, the end of the trial */
    trial_end: Timestamp | null;
}
