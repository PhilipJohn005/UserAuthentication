import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCEafXHKHO4sZy3AHbr6SpLQU1JS5YcX_I",
  authDomain: "crypto-cb142.firebaseapp.com",
  projectId: "crypto-cb142",
  storageBucket: "crypto-cb142.firebasestorage.app",
  messagingSenderId: "690963773596",
  appId: "1:690963773596:web:dcc8934c6d6291006fd559"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth()
export default app;
