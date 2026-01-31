import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    RecaptchaVerifier,
    signInWithPhoneNumber
} from "firebase/auth";

// TODO: Replace with your actual Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDUvx1BSX7N_fcfC5je2BkSSk_YobJ-EHU",
    authDomain: "mywebsite-2b31e.firebaseapp.com",
    projectId: "mywebsite-2b31e",
    storageBucket: "mywebsite-2b31e.firebasestorage.app",
    messagingSenderId: "1031162418115",
    appId: "1:1031162418115:web:861e94f103ba7228bce376",
    measurementId: "G-4DNZ60GZ9W"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const setupRecaptcha = (elementId) => {
    if (window.recaptchaVerifier) {
        try {
            window.recaptchaVerifier.clear();
        } catch (e) {
            console.warn("Error clearing recaptcha", e);
        }
        window.recaptchaVerifier = null;
    }

    window.recaptchaVerifier = new RecaptchaVerifier(auth, elementId, {
        'size': 'invisible',
        'callback': (response) => {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
        }
    });
    return window.recaptchaVerifier;
};
