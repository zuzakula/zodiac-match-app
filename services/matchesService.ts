import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import generateId from "../lib/generateId";

export const like = (userSwiped, loggedInUser, navigation) => {
  getDoc(
    doc(db, "Users", userSwiped.id, "likes", auth.currentUser?.uid as string)
  ).then((snapshot) => {
    if (snapshot) {
      setDoc(
        doc(
          db,
          "Matches",
          generateId(userSwiped.id, auth.currentUser?.uid)
        ) as any,
        {
          users: {
            [auth.currentUser?.uid as string]: loggedInUser,
            [userSwiped.id]: userSwiped,
          },
          usersMatched: [auth.currentUser?.uid, userSwiped.id],
        }
      ).then((r) => r);

      navigation.navigate(
        "Match" as never,
        { loggedInUser, userSwiped } as never
      );
    } else {
    }
  });
};
