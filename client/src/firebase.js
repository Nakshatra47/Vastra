// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "vastra-f18a7.firebaseapp.com",
  projectId: "vastra-f18a7",
  storageBucket: "vastra-f18a7.appspot.com",
  messagingSenderId: "584468098820",
  appId: "1:584468098820:web:ec90739fe454e40edbaa51"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;