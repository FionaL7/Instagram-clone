import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const config = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
};

const app = initializeApp(config);
export const auth = getAuth(app);
export const db = getFirestore(app);
// const { FieldValue } = firebase.firestore.FieldValue;

// seedDatabase(firebase);

export { app };
