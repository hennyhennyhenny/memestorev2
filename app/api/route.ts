import { NextRequest, NextResponse } from "next/server"
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore"

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

export const GET = async (request: NextRequest) => {
    const searchParams = request.nextUrl.searchParams
    let video_url = searchParams.get("videoURL")
    let tags = searchParams.get("tags")
    let tags_array = tags?.split(",")
    console.log("Url: " + video_url)
    console.log("Tags: " + tags)
    let returnString = `Video = ${video_url}         Tags = ${tags}`
    try {
        const docRef = await addDoc(collection(db, "users"), {
          videoURL: video_url,
          tagsArray: tags_array,
          tags: tags
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    return NextResponse.json(returnString)
}