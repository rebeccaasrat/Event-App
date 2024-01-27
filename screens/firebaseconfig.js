import { initializeApp } from 'firebase/app'; 
import { getAuth } from 'firebase/auth'; 
import { getFirestore } from 'firebase/firestore'; 
import { getStorage } from 'firebase/storage'; 
 

const firebaseConfig = {
  apiKey: "AIzaSyByOKFRVKmis8NcQrYAmbcqS1W47e0jHtE",
  authDomain: "eventcampus-d62fc.firebaseapp.com",
  projectId: "eventcampus-d62fc",
  storageBucket: "eventcampus-d62fc.appspot.com",
  messagingSenderId: "1013810629413",
  appId: "1:1013810629413:web:10bbb10cb1920b696928cc",
  measurementId: "G-PQBS9H4GW6"
};

// const firebaseConfig = {
//   apiKey: "AIzaSyCwnBnVUtcvVS_UQO3cxFhEpskZpQ4PE7I",
//   authDomain: "event2-82f5b.firebaseapp.com",
//   projectId: "event2-82f5b",
//   storageBucket: "event2-82f5b.appspot.com",
//   messagingSenderId: "1085366569799",
//   appId: "1:1085366569799:web:bd91638495e3defa825a62",
//   measurementId: "G-Z2Z8Y100P8"
// };
 
export const useFirebaseAuth = () => { 
  return { firebase_auth }; 
}; 
export const app = initializeApp(firebaseConfig); 
export const firebase_auth = getAuth(app); 
export const db = getFirestore(app); 
export const storage = getStorage(app);