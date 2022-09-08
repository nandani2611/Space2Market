// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDY0Nkx_TpaPwA2Nr2e27GqEU3lwvSBIU8",
  authDomain: "space2market-3b6b0.firebaseapp.com",
  projectId: "space2market-3b6b0",
  storageBucket: "space2market-3b6b0.appspot.com",
  messagingSenderId: "1074698509348",
  appId: "1:1074698509348:web:065039dcd63fd9f3cd0cb1"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} 

export { firebase };      