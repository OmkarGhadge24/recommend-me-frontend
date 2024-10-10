import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyD2vuL1kcagDM2AFMFf6p3QtO3IG3ePXt4",
    authDomain: "recommend-me-6969.firebaseapp.com",
    projectId: "recommend-me-6969",
    storageBucket: "recommend-me-6969.appspot.com",
    messagingSenderId: "693952771208",
    appId: "1:693952771208:web:8249124a25fbad265bdb3d",
    measurementId: "G-VQJWTGMQNX"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };