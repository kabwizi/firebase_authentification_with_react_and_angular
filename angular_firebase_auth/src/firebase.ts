import { environment } from './environments/environment';
/*
you can find the steps to complete this step on this link:
https://firebase.google.com/docs/web/setup

but don't forget to install the firebase
npm install @angular/fire firebase --save

Don't forget to create your own environment file (production and dev)
and initialize the environment variables with the data taken from firebase auth
environment.FIREBASE_API_KEY
environment.FIREBASE_PROJECT_ID
environment.FIREBASE_AUTH_DOMAIN
environment.FIREBASE_STORAGE_BUCKET
environment.FIREBASE_MESSAGING_SENDER_ID
environment.FIREBASE_APP_ID
*/

export const firebaseConfig = {
  apiKey: environment.FIREBASE_API_KEY,
  authDomain: environment.FIREBASE_AUTH_DOMAIN,
  projectId: environment.FIREBASE_PROJECT_ID,
  storageBucket: environment.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: environment.FIREBASE_MESSAGING_SENDER_ID,
  appId: environment.FIREBASE_APP_ID,
};
