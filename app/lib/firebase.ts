import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAt8YEyZt4hZJ7KhDhk02Z4N4bDqX8Mf1c",
  authDomain: "summarest-70f33.firebaseapp.com",
  projectId: "summarest-70f33",
  storageBucket: "summarest-70f33.firebasestorage.app",
  messagingSenderId: "838335322414",
  appId: "1:838335322414:web:014f27eb96ce0c20ae42bf"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);