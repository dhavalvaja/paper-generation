import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyAblpfnG2mrjI130SFfWSW7-e8ODVDwjeA",
    authDomain: "paper-generation.firebaseapp.com",
    databaseURL: "https://paper-generation-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "paper-generation",
    storageBucket: "paper-generation.appspot.com",
    messagingSenderId: "506616140080",
    appId: "1:506616140080:web:eccfb0e403186d0913b8f5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);