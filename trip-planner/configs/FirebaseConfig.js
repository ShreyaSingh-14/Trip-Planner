// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getReactNativePersistence, initializeAuth } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AI",//the previous one is deprecated- it does not workS
  authDomain: "ai-trip-planner-88f43.firebaseapp.com",
  projectId: "ai-trip-planner-88f43",
  storageBucket: "ai-trip-planner-88f43.firebasestorage.app",
  messagingSenderId: "1052196601740",
  appId: "1:1052196601740:web:0726cfd3578f248ae1a0a9",
  measurementId: "G-SHD0S99BN3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
}) ;
//using export will make it available to be used troughout the application