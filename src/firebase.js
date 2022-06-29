import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyBD-iwiDWyjLFiM34lAV2B_Vl-DHuCL3nM",
    authDomain: "machines-84e45.firebaseapp.com",
    projectId: "machines-84e45",
    storageBucket: "machines-84e45.appspot.com",
    messagingSenderId: "272338097865",
    appId: "1:272338097865:web:24a40f8b48277cca5b5f18",
    measurementId: "G-9Y6CYR87CF"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
export const auth = getAuth(app)