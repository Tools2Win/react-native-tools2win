import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
    apiKey: "AIzaSyBttlwwYOOVFfTw1yioOjWSZazf5dZNFl0",
    authDomain: "tools2win.firebaseapp.com",
    projectId: "tools2win",
    storageBucket: "tools2win.appspot.com",
    messagingSenderId: "456885395422",
    appId: "1:456885395422:web:317e4561113534cabbc74f"
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
})