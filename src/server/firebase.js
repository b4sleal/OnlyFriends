const { initializeApp } = require('firebase/app');
const { getFirestore } = require('firebase/firestore');
//const { getAuth } = require('firebase/auth');

// Initialize Firebase
// This is all just login info for firebase
// This was all available on firebase to copy and paste lol....
const app = initializeApp({
    apiKey: "AIzaSyBQzE2MMtr-qMpf04v3SlBPB22yMSpENBA",
    authDomain: "onlyfriends-365417.firebaseapp.com",
    projectId: "onlyfriends-365417",
    storageBucket: "onlyfriends-365417.appspot.com",
    messagingSenderId: "4050212950",
    appId: "1:4050212950:web:08e6a517cd18349247c3f7",
    measurementId: "G-RZBCXH2XGQ"
});

// Firebase storage
module.exports.db = getFirestore(app);
//module.exports.auth = getAuth(app);