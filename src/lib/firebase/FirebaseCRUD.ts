'use client';
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  setDoc,
  type DocumentData,
  type Firestore,
} from 'firebase/firestore';

// 🔹 CREATE
export const addUser = async (db: Firestore, user: DocumentData) => {
  try {
    // We are using the user's UID as the document ID
    if (user.uid) {
      const userRef = doc(db, 'users', user.uid);
      await setDoc(userRef, user, { merge: true });
    } else {
      // This case might not be ideal if UID is always expected.
      // Consider logging an error or handling it based on requirements.
      await addDoc(collection(db, 'users'), user);
    }
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

// 🔹 READ
export const getUsers = async (db: Firestore) => {
  try {
    const querySnapshot = await getDocs(collection(db, 'users'));
    const users: DocumentData[] = [];
    querySnapshot.forEach((doc) => {
      users.push({ id: doc.id, ...doc.data() });
    });
    return users;
  } catch (e) {
    console.error('Error getting documents: ', e);
  }
};

// 🔹 UPDATE
export const updateUser = async (
  db: Firestore,
  id: string,
  updatedData: DocumentData
) => {
  try {
    const userDoc = doc(db, 'users', id);
    await updateDoc(userDoc, updatedData);
  } catch (e) {
    console.error('Error updating document: ', e);
  }
};

// 🔹 DELETE
export const deleteUser = async (db: Firestore, id: string) => {
  try {
    const userDoc = doc(db, 'users', id);
    await deleteDoc(userDoc);
  } catch (e) {
    console.error('Error deleting document: ', e);
  }
};
