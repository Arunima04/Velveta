import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCFzrN6w4JjvI2i9sm31Ez2_f0iO2jPHBk",
  authDomain: "charup-website.firebaseapp.com",
  projectId: "charup-website",
  storageBucket: "charup-website.firebasestorage.app",
  messagingSenderId:"375726471355",
  appId: "1:375726471355:web:7f21a2b465e99f9541919e"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };