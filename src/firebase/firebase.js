// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAub-qhmtD6OFlZw5k3qXkCRv52RXMQxnU",
  authDomain: "vcsapp-a1ac0.firebaseapp.com",
  projectId: "vcsapp-a1ac0",
  storageBucket: "vcsapp-a1ac0.firebasestorage.app",
  messagingSenderId: "969821938563",
  appId: "1:969821938563:web:b8910bac404d811a384cb6",
  measurementId: "G-XBL0QYKRK1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db };