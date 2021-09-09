import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCWBoXMBBGlvmpMXahOHKI5X4iGkbsv-XU",
    authDomain: "app-19980.firebaseapp.com",
    projectId: "app-19980",
    storageBucket: "app-19980.appspot.com",
    messagingSenderId: "895902977631",
    appId: "1:895902977631:web:ac9adccb29baa81d9455ea",
    measurementId: "G-7KFFCR4J8Z"
})

const db = firebaseApp.firestore()

const auth = firebase.auth()

export { db, auth, firebaseApp}