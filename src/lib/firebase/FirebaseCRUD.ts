'use client';
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  type DocumentData,
} from 'firebase/firestore';
import { db } from '@/lib/firebase/firebase';

// 🔹 CREATE
export const addUser = async (user: DocumentData) => {
  try {
    await addDoc(collection(db, 'users'), user);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

// 🔹 READ
export const getUsers = async () => {
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
export const updateUser = async (id: string, updatedData: DocumentData) => {
  try {
    const userDoc = doc(db, 'users', id);
    await updateDoc(userDoc, updatedData);
  } catch (e) {
    console.error('Error updating document: ', e);
  }
};

// 🔹 DELETE
export const deleteUser = async (id: string) => {
  try {
    const userDoc = doc(db, 'users', id);
    await deleteDoc(userDoc);
  } catch (e) {
    console.error('Error deleting document: ', e);
  }
};
