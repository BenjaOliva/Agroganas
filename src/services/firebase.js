import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { getFirestore, query, getDocs, collection, where, addDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAO_RshYbaZtasQ9kYu--iiu5aWkP4gVsg",
  authDomain: "agroganas-5e529.firebaseapp.com",
  databaseURL: "https://agroganas-5e529.firebaseio.com",
  projectId: "agroganas-5e529",
  storageBucket: "agroganas-5e529.appspot.com",
  messagingSenderId: "776362086696",
  appId: "1:776362086696:web:d541b304ece51d46b0001d",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const logout = () => {
  signOut(auth);
};

const getProducts = async () => {
  try {
    let docsObject = [];
    const docs = await getDocs(collection(db, 'Productos'));
    docs.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      let item = { id: doc.id, ...doc.data() };
      docsObject.push(item);
    });
    console.log(docsObject);
    return docsObject;
  } catch (error) {
    console.log(error);
  }
};

export { auth, db, signInWithEmailAndPassword, logout, getProducts };
