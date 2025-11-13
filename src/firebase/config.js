
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyAlPCK_7xLm2LbyNxnfW7H1LbczjjRKbzc",
  authDomain: "olx-ecomm.firebaseapp.com",
  projectId: "olx-ecomm",
  storageBucket: "olx-ecomm.firebasestorage.app",
  messagingSenderId: "226468762593",
  appId: "1:226468762593:web:86dde368ab3ea0e0e638a0",
  measurementId: "G-5KE5DDHTMR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);