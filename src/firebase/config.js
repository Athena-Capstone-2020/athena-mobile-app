import * as firebase from "firebase";
import "@firebase/auth";
import "@firebase/firestore";
import Constants from 'expo-constants'

 var firebaseConfig = {
   apiKey: Constants.manifest.extra.FIREBASE_API_KEY,
   authDomain: Constants.manifest.extra.FIREBASE_AUTH_DOMAIN,
   databaseURL: Constants.manifest.extra.FIREBASE_DATABASE_URL,
   projectId: Constants.manifest.extra.FIREBASE_PROJECT_ID,
   storageBucket: Constants.manifest.extra.FIREBASE_STORAGE_BUCKET,
   messagingSenderId: Constants.manifest.extra.FIREBASE_MESSAGING_SENDER_ID,
   appId: Constants.manifest.extra.FIREBASE_APP_ID,
   measurementId: Constants.manifest.extra.FIREBASE_MEASUREMENT_ID,
 };

function initFirebase() {

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
}

export { firebase, initFirebase };
