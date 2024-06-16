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
    const citiesRef = collection(db, "users");
    const fsquery = query(citiesRef, where("tagsArray", "array-contains", squery))
    const querySnapshot = await getDocs(fsquery);
    let aList: string[] = []
    querySnapshot.forEach((doc) => {
        aList.push(doc.data().videoURL.split("/status/")[1])
        console.log(aList)
      });
    return NextResponse.json(aList)
}