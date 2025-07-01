// utils/firebase.js
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Replace with your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCL-DwHRmZArJDyuVZ-L7OMry-omeit990",
  authDomain: "kriyatus-interactive.firebaseapp.com",
  projectId: "kriyatus-interactive",
  storageBucket: "kriyatus-interactive.firebasestorage.app",
  messagingSenderId: "887684064280",
  appId: "1:887684064280:web:1fb9f09e090ed0c4940f6d",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
