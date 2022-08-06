// // Import the functions you need from the SDKs you need
// import app from 'firebase/compat/app';

// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Initialize Firebase

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: 'AIzaSyBpRESkZAaCUQNeh_OqbyBYh8Yu4UE4HRw',
//   authDomain: 'infox-4edc4.firebaseapp.com',
//   projectId: 'infox-4edc4',
//   storageBucket: 'infox-4edc4.appspot.com',
//   messagingSenderId: '945604355898',
//   appId: '1:945604355898:web:0c96bc31eddd6fd4f01203'
// };

// const app = initializeApp(firebaseConfig);

// const auth = app.auth();

// const provider = new auth.GoogleAuthProvider();
// provider.setCustomParameters({ prompt: 'select_account' });

// export const signInWithGoogle = () => auth.signInWithPopup(provider);

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBpRESkZAaCUQNeh_OqbyBYh8Yu4UE4HRw",
  authDomain: "infox-4edc4.firebaseapp.com",
  projectId: "infox-4edc4",
  storageBucket: "infox-4edc4.appspot.com",
  messagingSenderId: "945604355898",
  appId: "1:945604355898:web:0c96bc31eddd6fd4f01203",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => signInWithPopup(auth, provider);
export const db = getFirestore();
