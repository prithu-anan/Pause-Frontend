// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA8WeibeFQjP8hxST4i2OT5RC60m3QU6Uc",
  authDomain: "pause-bd.firebaseapp.com",
  projectId: "pause-bd",
  storageBucket: "pause-bd.appspot.com",
  messagingSenderId: "537920705710",
  appId: "1:537920705710:web:f87f9e13c6e6450c1e893f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);