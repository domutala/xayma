import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const plugin = async () => {
  const firebaseConfig = {
    apiKey: "AIzaSyAgqNzJLW14CijwytJjTi0H7wdoodPsDGM",
    authDomain: "xaymaio.firebaseapp.com",
    projectId: "xaymaio",
    storageBucket: "xaymaio.appspot.com",
    messagingSenderId: "154252806076",
    appId: "1:154252806076:web:aa49d2551cf3a34e34cdb9",
    measurementId: "G-MF1J4FE7B0",
    databaseURL: "https://xaymaio.firebaseio.com",
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const save = async (data: any) => {
    const docRef = await addDoc(collection(db, "experiences"), data);
    console.log("Document written with ID: ", docRef.id);
    return docRef;
  };

  return { app, db, save };
};

export default plugin;
