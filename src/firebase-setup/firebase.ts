import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDJ154wVDVjq3MFVlM9C8pz2kJHdB9_zSA",
  authDomain: "weather-176a7.firebaseapp.com",
  projectId: "weather-176a7",
  storageBucket: "weather-176a7.appspot.com",
  messagingSenderId: "30279065278",
  appId: "1:30279065278:web:0eb1177f70fadb2a97c8ef",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
export { app, auth, firestore, signOut };
