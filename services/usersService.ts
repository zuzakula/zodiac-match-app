import {
  collection,
  getDocs,
  setDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebaseConfig";

export const findAllPictures = async () => {
  const docRef = await getDocs(collection(db, "ProfilePictures"));
  const res = [];

  docRef.forEach((snapshot) => {
    res.push({
      id: snapshot.id,
      ...snapshot.data(),
    });
  });

  return res;
};

export const findAllUsers = async () => {
  const docRef = await getDocs(collection(db, "Users"));
  const res = [];

  docRef.forEach((snapshot) => {
    res.push({
      id: snapshot.id,
      ...snapshot.data(),
    });
  });

  return res;
};

export const createUser = async (body) => {
  await setDoc(doc(db, "Users", body.email) as any, body);
};

export const updateUser = async (currUser, body) => {
  const docRef = doc(db, "Users", currUser);
  await updateDoc(docRef as any, body);
};
