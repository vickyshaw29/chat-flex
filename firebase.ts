import { getApp, getApps, initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getFunctions } from 'firebase/functions'


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCpHsdQPW2Aukqyf1SRv9ewpcOmyDf7J8M",
    authDomain: "chat-flex-3beff.firebaseapp.com",
    projectId: "chat-flex-3beff",
    storageBucket: "chat-flex-3beff.appspot.com",
    messagingSenderId: "324591442708",
    appId: "1:324591442708:web:983ecc238a8fd6767f0001"
  };

//initialize firebase only once

const app = getApps?.length ? getApp() : initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)
const functions = getFunctions(app)

export  {db, auth, functions}