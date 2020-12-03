/**
 * db.js
 * Connect to cloud Firestore and get a database instance.
 */

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

// firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDtiiaRBXDHn2nlfUWbb4zncgh-PRKt9DU",
  authDomain: "spark-79fe2.firebaseapp.com",
  databaseURL: "https://spark-79fe2.firebaseio.com",
  projectId: "spark-79fe2",
  storageBucket: "spark-79fe2.appspot.com",
  messagingSenderId: "378418708272",
  appId: "1:378418708272:web:f662bebfd6c1e1747352f5"
}

// Initialize firebase app with config and firestore instance
firebase.initializeApp(firebaseConfig)
export const db = firebase.firestore()
export const firestore = firebase.firestore
export const auth = firebase.auth()

// references to collections
export const userCollection = db.collection('users')
export const eecsCollection = db.collection('eecs')
