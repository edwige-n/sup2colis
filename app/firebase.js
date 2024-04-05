// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebase from 'firebase/app';
import 'firebase/firestore';
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCtL2A9ptuG99y6PFSVCkutHOMFKcl6uEU",
  authDomain: "sup2colis.firebaseapp.com",
  projectId: "sup2colis",
  storageBucket: "sup2colis.appspot.com",
  messagingSenderId: "1004694138398",
  appId: "1:1004694138398:web:53e09bc68ae987248f080f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
export { firestore }; 
