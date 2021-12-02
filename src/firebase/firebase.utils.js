import firebase from "firebase/app";
//import firebase from "firebase/compat/app";
import "firebase/firestore"; //functions
import "firebase/auth"; //authentication

//config

const config = {
  apiKey: "AIzaSyAmpqMl4fojanCRvmAEJ8ioH43s7o1T1Ww",
  authDomain: "bases-react-escalab-5c607.firebaseapp.com",
  projectId: "bases-react-escalab-5c607",
  storageBucket: "bases-react-escalab-5c607.appspot.com",
  messagingSenderId: "1008443129250",
  appId: "1:1008443129250:web:18968d3c82db76e7f6c6fb"
};

// Initialize Firebase
//create my web app with firebase
firebase.initializeApp(config);

//function for create-documents
export const createUserProfileDocument = async (eserAuth, additionalData)=> {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uuid}`);

    const snapShop = await userRef.get();

    if(!snapShop.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {
            await userRef.set({
                displayName, email, createdAt, ... additionalData
                
            });
        } catch (error) {
            console.log("error creating users", error.message);
        }
    }
    return userRef;
}

//exports
export const auth = firebase.auth();
export const firestore = firebase.firestore();

//providers
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;