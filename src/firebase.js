import firebase from "firebase/app"
import "firebase/auth"
import "firebase/storage"
import "firebase/firestore"
firebase.initializeApp(
    {   
        apiKey: "AIzaSyD8jXt2ZohYZogNJ05g1I_gtFTcMzaxv9A",
        authDomain: "reels-cd094.firebaseapp.com",
        projectId: "reels-cd094",
        storageBucket: "reels-cd094.appspot.com",
        messagingSenderId: "305685038379",
        appId: "1:305685038379:web:59b98ceb49601f29a9716e"
    }
)

export const auth = firebase.auth();

/* firestore is used to create collections in database, we will not export
 it directly for security reasons
*/

const firestore = firebase.firestore();
export const database = {
    users : firestore.collection('users'),
    getCurrentTimeStamp : firebase.firestore.FieldValue.serverTimestamp
}
export const storage = firebase.storage();

// export default firebase;