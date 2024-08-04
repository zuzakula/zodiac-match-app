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
import { getStorage, ref } from "firebase/storage";

export type User = {
  id: string;
  name?: string;
  email?: string;
  age?: number;
  birthdayDate?: string;
  birthdayTime?: string;
  bio?: string;
  url?: string;
  zodiacSign?: string;
  initialSetupDone?: boolean;
  emailVerified?: boolean;
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
  const swipes: Set<string> = new Set();
  const currentUserId = auth.currentUser?.uid;

  try {
    if (currentUserId) {
      const passesSnapshot = await getDocs(
        collection(db, "Users", currentUserId as string, "passes")
      );
      const likesSnapshot = await getDocs(
        collection(db, "Users", currentUserId as string, "likes")
      );

      passesSnapshot.forEach((snapshot) => {
        swipes.add(snapshot.data().id);
      });

      likesSnapshot.forEach((snapshot) => {
        swipes.add(snapshot.data().id);
      });
    }

    let docRef;

    if (swipes.size !== 0) {
      const q = query(
        collection(db, "Users"),
        where("id", "not-in", Array.from(swipes))
      );
      docRef = await getDocs(q);
    } else {
      docRef = await getDocs(collection(db, "Users"));
    }

    docRef.forEach((snapshot) => {
      const userId = snapshot.data().id;
      if (userId !== auth.currentUser?.uid && !swipes.has(userId)) {
        users.push({
          id: userId,
          ...snapshot.data(),
        });
      }
    });
  } catch (error) {
    console.error("Error fetching users:", error);
  }

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
  try {
    const docRef = doc(db, "Users", currUser);
    await updateDoc(docRef, body);
    console.log("Document successfully updated!");
  } catch (error) {
    console.error("Error updating document: ", error);
    throw new Error("Failed to update document");
  }
};
