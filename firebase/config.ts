// Import the functions you need from the SDKs you need
import { getApps, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig: any = {
    apiKey: "AIzaSyA15RONnQY2Y8sZQZjwcK6HvWOFX-VUocM",
    authDomain: "teman-k3.firebaseapp.com",
    projectId: "teman-k3",
    storageBucket: "teman-k3.appspot.com",
    messagingSenderId: "654812161066",
    appId: "1:654812161066:web:75286916ed2911132c0f53",
    measurementId: "G-2ZJQN06D9N"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
