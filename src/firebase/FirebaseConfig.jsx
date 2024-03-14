
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import {getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyASD7LmZKm57hKQ8O768VS7mDYaSmYH3ek",
  authDomain: "ecommerce-3932a.firebaseapp.com",
  projectId: "ecommerce-3932a",
  storageBucket: "ecommerce-3932a.appspot.com",
  messagingSenderId: "192738467271",
  appId: "1:192738467271:web:cb1ef1e2c59fd8f9fdcde2"
};


const app = initializeApp(firebaseConfig);
const fireDB=getFirestore(app);
const auth=getAuth(app);
export{fireDB,auth};