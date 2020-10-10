import * as firebase from "firebase";
import "@firebase/auth";
import "@firebase/firestore";

 var firebaseConfig = {
   apiKey: "AIzaSyCRTwB9P_KwcE9KdCtopXY7ep7I2kDSUJg",
   authDomain: "athena-development-53c47.firebaseapp.com",
   databaseURL: "https://athena-development-53c47.firebaseio.com",
   projectId: "athena-development-53c47",
   storageBucket: "athena-development-53c47.appspot.com",
   messagingSenderId: "1021500470015",
   appId: "1:1021500470015:web:d6568c87931091233512ca",
   measurementId: "G-H0NXPDW88R",
 };

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
