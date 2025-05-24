import { initializeApp } from "@firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getReactNativePersistence, initializeAuth } from "@firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyC7GfrpRz8bTQjEEYOmF_md4eYVd68jZwc",
  authDomain: "skillhub-39697.firebaseapp.com",
  projectId: "skillhub-39697",
  storageBucket: "skillhub-39697.firebasestorage.app",
  messagingSenderId: "411505543575",
  appId: "1:411505543575:web:344cfbfce977617ebc9cd2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
})

export { db, auth }