"use client";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  query,
  collection,
  where,
  getDocs,
} from "firebase/firestore";

import { useState, useEffect } from "react";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
  apiKey: "AIzaSyAt2DCQgL1mjBInrBmEW_T-35gkP_fOiGA",
  authDomain: "memestore-v2.firebaseapp.com",
  projectId: "memestore-v2",
  storageBucket: "memestore-v2.appspot.com",
  messagingSenderId: "1017815184770",
  appId: "1:1017815184770:web:e485901c76440cc099cb9b",
  measurementId: "G-7G6C94CX04",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/*const search = async (squery: string) => {
  const ref = collection(db, "users");
  const fsquery = query(ref, where("tagsArray", "array-contains", squery));
  const querySnapshot = await getDocs(fsquery);
  let aList: any[] = [];
  querySnapshot.forEach((doc) => {
    aList.push(doc.data().videoURL);
  });
  let embedList = [];
  for (let i = 0; i < aList.length; i++) {
    const tempURL = aList[i];
    let embedFetch = await fetch(
      `https://publish.twitter.com/oembed?url=${tempURL}`
    );
    let embedFetchJson = await embedFetch.json();
    embedList.push(embedFetchJson.html);
  }
  return embedList;
};*/

export default function SearchBar() {
    const [embedList, setEmbedList] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [searchQ, setSearchQ] = useState("?");
    useEffect(() => {
      fetch(`/api/search?searchQuery=${searchQ}`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
          setEmbedList(data);
          setLoading(false);
        });
    }, []);
    //https://platform.twitter.com/embed/Tweet.html?dnt=false&embedId=twitter-widget-3&frame=false&hideCard=false&hideThread=false&lang=en&theme=dark&width=550px
  const handleChange = async (e) => {
    setSearchQ(e.target.value);
    fetch(`/api/search?searchQuery=${e.target.value}`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
          setEmbedList(data);
          setLoading(false);
        });
  };
  return (
    <div>
      <label htmlFor="search">Search</label>
      <input placeholder="?" onChange={handleChange}></input>
      <div style={{display: "flex"}}>
        {embedList.map((s, index) => (
          <div key={index} dangerouslySetInnerHTML={{ __html: s }} />
        ))}
      </div>
    </div>
  );
}
