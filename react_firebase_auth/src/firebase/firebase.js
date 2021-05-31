import firebase from 'firebase/app'
import 'firebase/auth'

/*
you can find the steps to complete this step on this link:
https://firebase.google.com/docs/web/setup

but don't forget to install the firebase
npm install --save firebase
*/

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
}

const app = firebase.initializeApp(firebaseConfig)

export const firebaseApp = firebase
export default app
