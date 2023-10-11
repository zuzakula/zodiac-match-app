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
import storage from "@react-native-firebase/storage";
import { getStorage, ref } from "firebase/storage";

export type User = {
  id: string;
  name?: string;
  email?: string;
  birthdayDate?: string;
  birthdayTime?: string;
  bio?: string;
  url?: string;
  zodiacSign?: string;
};

export const findAllPictures = async () => {
  const docRef = await getDocs(collection(db, "ProfilePictures"));
  const res: { id: string }[] = [];

  docRef.forEach((snapshot) => {
    res.push({
      id: snapshot.id,
      ...snapshot.data(),
    });
  });

  return res;
};

export const findPicture = async (id: string) => {
  const docRef = doc(db, "ProfilePictures", id);
  const docSnap = await getDoc(docRef);

  const storage = getStorage();
  const pathReference = ref(storage, `ProfilePictures/${id}`);

  return docSnap.data();
};

export const findUsers = async () => {
  const users: { id: string }[] = [];
  let docRef;
  let q;

  const passes = await getDocs(
    collection(db, "Users", auth.currentUser?.uid as string, "passes")
  );
  const likes = await getDocs(
    collection(db, "Users", auth.currentUser?.uid as string, "likes")
  );
  const swipes: any[] = [];

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

export const findUser = async (id: string) => {
  const docRef = doc(db, "Users", id);
  const docSnap = await getDoc(docRef);

  return docSnap.data();
};

export const createUser = async (body: User) => {
  await setDoc(doc(db, "Users", body.id) as any, body);
};

export const updateUser = async (currUser: string, body: User) => {
  const docRef = doc(db, "Users", currUser);
  await updateDoc(docRef as any, body);
};
