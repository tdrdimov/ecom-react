import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyDmRpiWlCLVWvxpKtrxlRYw7Dadoz99LuE",
  authDomain: "crwn-react-6b805.firebaseapp.com",
  databaseURL: "https://crwn-react-6b805.firebaseio.com",
  projectId: "crwn-react-6b805",
  storageBucket: "crwn-react-6b805.appspot.com",
  messagingSenderId: "834110943475",
  appId: "1:834110943475:web:07f4c118c3aa1b17954786"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
