
import { initializeApp } from 'firebase/app';
import {getFirestore} from '@firebase/firestore'
const firebaseConfig = {
    apiKey: "AIzaSyDFnEEhSbEeB3lteXh1X7yx7zV2nDPFfIw",
    authDomain: "bharat-one-care.firebaseapp.com",
    projectId: "bharat-one-care",
    storageBucket: "bharat-one-care.appspot.com",
    messagingSenderId: "914626421982",
    appId: "1:914626421982:web:e5c4fe52856de6fb028e4f",
    measurementId: "G-0Z02CN19KE"
  };

  const app = initializeApp(firebaseConfig);

  export const db = getFirestore(app)