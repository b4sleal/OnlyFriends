const { initializeApp } = require('firebase/app');
const { getFirestore } = require('firebase/firestore');
const { getStorage } = require("firebase/storage");
//const { getAuth } = require('firebase/auth');

// Initialize Firebase
// This is all just login info for firebase
const app = initializeApp({
    apiKey: "AIzaSyAQ5fGdsJY1NZPmATdunefq6lcJIhPZVns",
    authDomain: "onlyfriends-64a58.firebaseapp.com",
    projectId: "onlyfriends-64a58",
    storageBucket: "onlyfriends-64a58.appspot.com",
    messagingSenderId: "787474632436",
    appId: "1:787474632436:web:21e4d6971b5043eac3d8a1",
    measurementId: "G-VCNM0N91JH"
});

// Firebase storage
module.exports.db = getFirestore(app);
module.exports.storage = getStorage(app);
//module.exports.auth = getAuth(app);