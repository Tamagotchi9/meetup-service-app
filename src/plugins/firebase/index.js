import { initializeApp } from "firebase/app";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  query,
  setDoc,
  updateDoc,
  deleteDoc
} from "firebase/firestore";
import { getAuth, signOut } from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA6gd930fm2oRV0L0WBiVuAN-vEYMY21Cg",
  authDomain: "meetups-service.firebaseapp.com",
  databaseURL:
    "https://meetups-service-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "meetups-service",
  storageBucket: "gs://meetups-service.appspot.com",
  messagingSenderId: "678136236396",
  appId: "1:678136236396:web:3b11efc63779a1b9b90b49",
  measurementId: "G-3TXZ52JNFV"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth();

// TODO: slice it out here to auth API!
export const logout = async () => {
  try {
    if (!auth) {
      return;
    }
    await signOut(auth);
  } catch (err) {
    throw new Error(err);
  }
};

const performStorageRef = (folderName, fileName) => {
  if (folderName) {
    return ref(storage, `${folderName}/${fileName}`);
  } else {
    return ref(storage, fileName);
  }
};

export const upload = async (file, folderName) => {
  try {
    await uploadBytes(performStorageRef(folderName, file.name), file);
  } catch (e) {
    throw new Error(e);
  }
};

export const download = async (fileName, folderName) => {
  try {
    return await getDownloadURL(performStorageRef(folderName, fileName));
  } catch (e) {
    throw new Error(e);
  }
};

export const getMeetup = async (dbCollection, documentId) => {
  try {
    if (documentId) {
      const docRef = doc(db, dbCollection, documentId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        return new Error("No such document");
      }
    }
    const requestQueries = query(collection(db, dbCollection), limit(10));
    const querySnapshot = await getDocs(requestQueries);

    const data = [];

    if (!querySnapshot.size) {
      return new Error("No such data");
    }

    querySnapshot.forEach(doc => data.push(doc.data()));

    return data;
  } catch (e) {
    throw new Error(e);
  }
};

const Firebase = {
  install(Vue) {
    Vue.prototype.$firebase = {
      async get(dbCollection, documentId) {
        try {
          if (documentId) {
            const docRef = doc(db, dbCollection, documentId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
              return docSnap.data();
            } else {
              return new Error("No such document");
            }
          }
          const requestQueries = query(collection(db, dbCollection), limit(10));
          const querySnapshot = await getDocs(requestQueries);

          const data = [];

          if (!querySnapshot.size) {
            return new Error("No such data");
          }

          querySnapshot.forEach(doc => data.push(doc.data()));

          return data;
        } catch (e) {
          throw new Error(e);
        }
      },
      async post(dbCollection, documentId, payload) {
        try {
          const dataRef = collection(db, dbCollection);
          await setDoc(doc(dataRef, documentId), payload);
        } catch (e) {
          throw new Error(e);
        }
      },
      async put(dbCollection, documentId, payload) {
        try {
          await updateDoc(doc(db, dbCollection, documentId), payload);
        } catch (e) {
          throw new Error(e);
        }
      },
      async delete(dbCollection, documentId) {
        try {
          await deleteDoc(doc(db, dbCollection, documentId));
        } catch (e) {
          throw new Error(e);
        }
      }
    };
  }
};

export default Firebase;
