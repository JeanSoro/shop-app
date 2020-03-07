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

//create snapShot/data to add to DB if non existent
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`)
  const snapShot = await userRef.get();

  //if not existing in DB
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      //create new document
      await userRef.set({ displayName, email, createdAt, ...additionalData })
    } catch (error) {
      console.log('error creating user', error.message)
    }
  }

  return userRef
}

// ---------------------------------------------------------------
// SHOP DATA UTIL/ADD DATA RELATED TO STORE PRODUCTS
// ---------------------------------------------------------------

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {

  const collectionRef = firestore.collection(collectionKey);

  const batch = firestore.batch();
  objectsToAdd.forEach(object => {
    //create new doc ref and generate ID
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, object);
  });

  return await batch.commit()

}

// --------------------------------------------------------------------
// SHOP DATA UTIL/PULL DATA RELATED TO STORE PRODUCTS / COLLECTIONS DOC
// -------------------------------------------------------------------

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.doc.map(doc => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    }
  });

  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {})
}


firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe();
      resolve(userAuth)
    }, reject)
  })
}

export const googleProvider = new firebase.auth.GoogleAuthProvider();
//trigger google popup for sign in/authentication
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;