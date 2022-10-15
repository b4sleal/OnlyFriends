import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth';

// Initialize Firebase
const app = initializeApp({
    apiKey: "AIzaSyBQzE2MMtr-qMpf04v3SlBPB22yMSpENBA",
    authDomain: "onlyfriends-365417.firebaseapp.com",
    projectId: "onlyfriends-365417",
    storageBucket: "onlyfriends-365417.appspot.com",
    messagingSenderId: "4050212950",
    appId: "1:4050212950:web:08e6a517cd18349247c3f7",
    measurementId: "G-RZBCXH2XGQ"
});

// Firebase storage reference
export const db = getFirestore(app);
export const auth = getAuth(app);
