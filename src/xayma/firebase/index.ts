import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithCredential,
} from "firebase/auth";

const plugin = async () => {
  const firebaseConfig = {
    apiKey: "AIzaSyCNBf3hOjiqkgO_UdtkLdQK2jx-vP64LSY",
    authDomain: "nexts-d4a8d.firebaseapp.com",
    projectId: "nexts-d4a8d",
    storageBucket: "nexts-d4a8d.appspot.com",
    messagingSenderId: "123900371037",
    appId: "1:123900371037:web:f861d97d9ab48a90afedb4",
    measurementId: "G-6TPFCZZCRN",
    databaseURL: "https://nexts-d4a8d.firebaseio.com",
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);

  const withGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    if (!result) return;

    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.idToken;
    if (token) sessionStorage.setItem("xayma.auth.token", token);
  };

  const login = async (force?: boolean) => {
    const old = sessionStorage.getItem("xayma.auth.token");
    try {
      const credential = GoogleAuthProvider.credential(old);
      await signInWithCredential(auth, credential);
    } catch (error) {
      if (force) await withGoogle();
    }
  };

  const save = async (data: any) => {
    const docRef = await addDoc(collection(db, "experiences"), data);
    console.log("Document written with ID: ", docRef.id);
    return docRef;
  };

  if (!auth.currentUser) await login();

  return { app, auth, db, login, save };
};

export default plugin;
