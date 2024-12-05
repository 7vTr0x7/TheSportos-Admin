import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; // Import Firestore

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAawILXEDeQ2fm0Ml9ugsqrUOESUcOIcTw',
  authDomain: 'thesprotos-77a1a.firebaseapp.com',
  projectId: 'thesprotos-77a1a',
  storageBucket: 'thesprotos-77a1a.firebasestorage.app',
  messagingSenderId: '27648913105',
  appId: '1:27648913105:web:3ce82c4a01c6656aa2dff0',
  measurementId: 'G-H3Z07L5NHP',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication
export const auth = getAuth(app);

// Initialize Firestore
export const firestore = getFirestore(app); // Export Firestore
