import * as firebase from "firebase";
import "@firebase/auth";
import "@firebase/firestore";

function initFirebase(firebaseConfig) {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
}

export { firebase, initFirebase };
