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

export const findPicture = async (email) => {
  const docRef = doc(db, "ProfilePictures", email);
  const docSnap = await getDoc(docRef);

  return docSnap.data();
};

export const findUsers = async () => {
  const users = [];
  let docRef;
  let q;

  const passes = await getDocs(
    collection(db, "Users", auth.currentUser?.email as string, "passes")
  );
  const likes = await getDocs(
    collection(db, "Users", auth.currentUser?.email as string, "likes")
  );
  const swipes = [];

  passes.forEach((snapshot) => {
    swipes.push(snapshot.data().email);
  });

  likes.forEach((snapshot) => {
    swipes.push(snapshot.data().email);
  });

  if (swipes.length !== 0) {
    q = query(collection(db, "Users"), where("email", "not-in", [...swipes]));
    docRef = await getDocs(q);
  } else {
    docRef = await getDocs(collection(db, "Users")).then((r) => r);
  }

  docRef.forEach((snapshot) => {
    if (snapshot.data().email !== auth.currentUser?.email) {
      users.push({
        id: snapshot.id,
        ...snapshot.data(),
      });
    }
  });

  // console.log(users);

  return users;
};

export const findUser = async (email) => {
  const docRef = doc(db, "Users", email);
  const docSnap = await getDoc(docRef);

  return docSnap.data();
};

export const createUser = async (body) => {
  await setDoc(doc(db, "Users", body.email) as any, body);
};

export const updateUser = async (currUser, body) => {
  const docRef = doc(db, "Users", currUser);
  await updateDoc(docRef as any, body);
};
