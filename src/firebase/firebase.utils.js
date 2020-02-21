import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyAbRUBdhhJk5piPVf9oBTi5sskVAtxoGLg",
  authDomain: "reactshop-94266.firebaseapp.com",
  databaseURL: "https://reactshop-94266.firebaseio.com",
  projectId: "reactshop-94266",
  storageBucket: "reactshop-94266.appspot.com",
  messagingSenderId: "158224844317",
  appId: "1:158224844317:web:b2a4c4361f9453f34f68f4",
  measurementId: "G-NHRZ4R0FCD"
};

//create snapShot/data
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`)
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({ displayName, email, createdAt, ...additionalData })
    } catch (error) {
      console.log('error creating user', error.message)
    }
  }

  return userRef

}


firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
//trigger google popup for sign in/authentication
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;