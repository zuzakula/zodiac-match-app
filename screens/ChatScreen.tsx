import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "./components/Header";
import shared from "../styles/shared.styles";
import ChatList from "./components/ChatList";
import ChatRow from "./components/ChatRow";
import { useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig";
import { collection, onSnapshot, query, where } from "firebase/firestore";

const ChatScreen = () => {
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

  return (
    <SafeAreaView style={shared.screen}>
      <Header />
      <View style={{ marginTop: 30 }}>
        {matches.length > 0 ? (
          <FlatList
            data={matches}
            renderItem={({ item }) => {
              return <ChatRow matchDetails={item} />;
            }}
          />
        ) : (
          <View>
            <Text>No matches yet :(</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default ChatScreen;
