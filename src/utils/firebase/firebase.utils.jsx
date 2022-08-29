import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider, 
} from 'firebase/auth';
import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore'
const firebaseConfig = {
    apiKey: "AIzaSyCviDioo9lv6yoTqY-tk_HtUSfg0ePlpMI",
    authDomain: "modest-fashion-db.firebaseapp.com",
    projectId: "modest-fashion-db",
    storageBucket: "modest-fashion-db.appspot.com",
    messagingSenderId: "680032811581",
    appId: "1:680032811581:web:14066b2eb0308c79a24854"
  };
  
  // Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createAt
            });
        } catch (error) {
            console.log('error creating the user', error.message)
        }
    }

    return userDocRef;
    //if user data exists

    //return userDocRef
};