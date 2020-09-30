import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
// Configure Firebase.
const config = {
  apiKey: "AIzaSyCsyxS3nBneZlBow7IbT_sSMJ6w7hoEuN4",
  authDomain: "e-exam-89def.firebaseapp.com",
  databaseURL: "https://e-exam-89def.firebaseio.com",
  projectId: "e-exam-89def",
  storageBucket: "e-exam-89def.appspot.com",
  messagingSenderId: "1560048224",
  appId: "1:1560048224:web:cd7cac4f4142c6afe00905",
  measurementId: "G-73PJ5ZPRPH",
  appVerificationDisabledForTesting: true,
};
firebase.initializeApp(config);
// firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase;
