import { NextRequest, NextResponse } from "next/server"
import { initializeApp } from "firebase/app";
import { getFirestore, query, collection, where, getDocs } from "firebase/firestore"

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

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
//https://developer.x.com/en/docs/twitter-for-websites/oembed-api
export const GET = async (request: NextRequest) => {
    const searchParams = request.nextUrl.searchParams
    let squery = searchParams.get("searchQuery")
    let split_query = squery?.split(" ")
    const citiesRef = collection(db, "users");
    const fsquery = query(citiesRef, where("tagsArray", "array-contains", squery))
    const querySnapshot = await getDocs(fsquery);
    let aList: string[] = []
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        //console.log(doc.id, " => ", doc.data());
        aList.push(doc.data().videoURL)
        console.log(aList)
      });
    let embedList = []
    for (let i = 0; i < aList.length; i++) {
        const tempURL = aList[i];
        //console.log(tempURL)
        //let embedFetch = await fetch(`https://publish.twitter.com/oembed?url=https://x.com/yolandafister/status/1802054918024429780`)
        let embedFetch = await fetch(`https://publish.twitter.com/oembed?url=${tempURL}&hide_media=false&align=center&theme=dark&max_width=550`)
        //console.log(embedFetch)
        let embedFetchJson = await embedFetch.json();
        //console.log(embedFetchJson)
        embedList.push(embedFetchJson.html)
        console.log(embedList)
    }
    return NextResponse.json(embedList)
}