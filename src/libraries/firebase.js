import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const config = {
  apiKey: "AIzaSyB3P1gLaQoecWE2Tllma_cLSUgXspShO2M",
  authDomain: "instagram-7a0eb.firebaseapp.com",
  projectId: "instagram-7a0eb",
  storageBucket: "instagram-7a0eb.appspot.com",
  messagingSenderId: "482361647733",
  appId: "1:482361647733:web:f47df9144657257004ce3c",
};

const app = initializeApp(config);
export const auth = getAuth(app);
export const db = getFirestore(app);
// const { FieldValue } = firebase.firestore.FieldValue;

// seedDatabase(firebase);

export { app };
