import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import firebaseConfig from "./config";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
export { signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword}