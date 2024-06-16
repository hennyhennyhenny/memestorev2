import Image from "next/image";
import { initializeApp } from "firebase/app";
import { getFirestore, query, collection, where, getDocs } from "firebase/firestore"
import SearchBar from "./components/SearchBar";
import SearchBarTwo from "./components/SearchBarTwo";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
    apiKey: "AIzaSyAt2DCQgL1mjBInrBmEW_T-35gkP_fOiGA",
    authDomain: "memestore-v2.firebaseapp.com",
    projectId: "memestore-v2",
    storageBucket: "memestore-v2.appspot.com",
    messagingSenderId: "1017815184770",
    appId: "1:1017815184770:web:e485901c76440cc099cb9b",
    measurementId: "G-7G6C94CX04"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default async function Home() {
  return (
    <main className="">
      <h1>keep it together aviva</h1>
      <SearchBarTwo />
    </main>
  );
}

