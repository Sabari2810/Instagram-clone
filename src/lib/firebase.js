import Firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyAlkobDefMI9MS5U_GvtEUby5XNcJ1OlaA",
  authDomain: "instagram-c60c0.firebaseapp.com",
  projectId: "instagram-c60c0",
  storageBucket: "instagram-c60c0.appspot.com",
  messagingSenderId: "1032932392536",
  appId: "1:1032932392536:web:09c3092f600fdae587142d",
};

const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;

// export { firebase, FieldValue };

export { firebase, FieldValue };
