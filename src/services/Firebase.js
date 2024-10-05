
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

console.log("Firebase API Key:", process.env.REACT_APP_API_KEY);

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: "fitness-tracker-3d3d2.firebaseapp.com",
    projectId: "fitness-tracker-3d3d2",
    storageBucket: "fitness-tracker-3d3d2.appspot.com",
    messagingSenderId: "1092809389563",
    appId: "1:1092809389563:web:e18522151f14d950b9075e"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const firestore = getFirestore(app)