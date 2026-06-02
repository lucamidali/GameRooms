// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Sostituisci questo oggetto con quello fornito dalla tua console Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBbf1qJXfhTgSX1LYIUYOb3wwPqCsf18zA",
  authDomain: "gamerooms-bd483.firebaseapp.com",
  projectId: "gamerooms-bd483",
  storageBucket: "gamerooms-bd483.firebasestorage.app",
  messagingSenderId: "987188470331",
  appId: "1:987188470331:web:316221f6c941adcc28f21e",
  measurementId: "G-D5VFLKJDGD"
};

// Inizializza Firebase
const app = initializeApp(firebaseConfig);

// Inizializza il database Firestore e esportalo
export const db = getFirestore(app);