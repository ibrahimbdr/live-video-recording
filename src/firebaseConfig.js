import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBBJ2iSZZc_wfENGnI_mV6PpjDKBW0QQ6o",
  authDomain: "live-video-b3e1d.firebaseapp.com",
  projectId: "live-video-b3e1d",
  storageBucket: "live-video-b3e1d.appspot.com",
  messagingSenderId: "551407432087",
  appId: "1:551407432087:web:10eed72df5cbca4fbe94d2"
};

const app = initializeApp(firebaseConfig);

export const database = getFirestore(app);
export const storage = getStorage(app);