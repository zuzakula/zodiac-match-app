import { View, Text, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { auth, db } from "../../firebaseConfig";
import ChatRow from "./ChatRow";

const ChatList = () => {
  const [matches, setMatches] = useState([]);
  const user = auth.currentUser;

  useEffect(() => {
    onSnapshot(
      query(
        collection(db, "Matches") as any,
        where("usersMatched", "array-contains", auth.currentUser?.uid) as any
      ),
      (snapshot) =>
        setMatches(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
    );
  }, [user]);
  return matches.length > 0 ? (
    <FlatList
      data={matches}
      renderItem={({ item }) => {
        console.log(item);
        return <ChatRow matchDetails={item} />;
      }}
    />
  ) : (
    <View>
      <Text>No matches yet :(</Text>
    </View>
  );
};

export default ChatList;
