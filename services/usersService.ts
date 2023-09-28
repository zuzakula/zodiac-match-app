import {
  collection,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  getDoc,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "../firebaseConfig";

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

export const findPicture = async (id) => {
  const docRef = doc(db, "ProfilePictures", id);
  const docSnap = await getDoc(docRef);

  return docSnap.data();
};

export const findUsers = async () => {
  const users = [];
  let docRef;
  let q;

  const passes = await getDocs(
    collection(db, "Users", auth.currentUser?.uid as string, "passes")
  );
  const likes = await getDocs(
    collection(db, "Users", auth.currentUser?.uid as string, "likes")
  );
  const swipes = [];

  passes.forEach((snapshot) => {
    swipes.push(snapshot.data().id);
  });

  likes.forEach((snapshot) => {
    swipes.push(snapshot.data().id);
  });

  if (swipes.length !== 0) {
    q = query(collection(db, "Users"), where("id", "not-in", [...swipes]));
    docRef = await getDocs(q);
  } else {
    docRef = await getDocs(collection(db, "Users")).then((r) => r);
  }

  docRef.forEach((snapshot) => {
    if (snapshot.data().id !== auth.currentUser?.uid) {
      users.push({
        id: snapshot.id,
        ...snapshot.data(),
      });
    }
  });

  return users;
};

export const findUser = async (id) => {
  const docRef = doc(db, "Users", id);
  const docSnap = await getDoc(docRef);

  return docSnap.data();
};

export const createUser = async (body) => {
  await setDoc(doc(db, "Users", body.id) as any, body);
};

export const updateUser = async (currUser, body) => {
  const docRef = doc(db, "Users", currUser);
  await updateDoc(docRef as any, body);
};
