"use client"
import { auth } from '@/firebase'
import { signInWithCustomToken } from 'firebase/auth'
import { Session } from 'next-auth'
import { useSession } from 'next-auth/react'
import React, { useEffect } from 'react'

const syncFirebaseAuth  = async(session:Session)=>{
        if(session && session?.firebaseToken){
            try {
                await signInWithCustomToken(auth, session?.firebaseToken)
            } catch (error) {
                console.log("Error signing with custom token", error)
            }
        }else{
            auth.signOut()
        }
}

const FirebaseAuthProvider = ({children}:{children:React.ReactNode}) => {
    const { data: session } = useSession()
    useEffect(()=>{
        if(!session) return;
        syncFirebaseAuth(session)
    },[session])
    return <>{children}</>
}

export default FirebaseAuthProvider