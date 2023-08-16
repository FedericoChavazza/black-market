import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseServices = firebase.initializeApp({
  apiKey: "AIzaSyDFO3rc8k2WS2tPpcvVFSwCbmV_DkKQxzQ",
  authDomain: "black-market-65086.firebaseapp.com",
  projectId: "black-market-65086",
  storageBucket: "black-market-65086.appspot.com",
  messagingSenderId: "263149424701",
  appId: "1:263149424701:web:4ca53457bc10852b355a54",
  measurementId: "G-RXBM03RBGY",
});

const db = firebaseServices.firestore();

const auth = firebaseServices.auth();

export { db, auth };
