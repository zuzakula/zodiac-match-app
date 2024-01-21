import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { auth, storage } from "../firebaseConfig";
import { updateUser, User } from "./usersService";

export const uploadImage = async (uri: string) => {
  const response = await fetch(uri);
  const blob = await response.blob();
  const userId = auth.currentUser?.uid;
  const imageId = Date.now().toString();

  const storageRef = ref(storage, `ProfilePictures/${userId}/${imageId}.jpg`);
  const uploadTask = uploadBytesResumable(storageRef, blob);

  uploadTask.on(
    "state_changed",
    () => {},
    (err) => {
      console.log(err);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then(async () => {
        await saveImage(uri);
      });
    }
  );
};

export const saveImage = async (url: string) => {
  const user: string | undefined = auth.currentUser?.uid;
  try {
    await updateUser(user as string, { url: url } as User);
  } catch (err) {
    console.log(err);
  }
};
