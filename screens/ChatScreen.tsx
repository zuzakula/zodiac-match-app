import { FlatList, ImageBackground, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "./components/Header";
import shared from "../styles/shared.styles";
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
      (snapshot: any) =>
        setMatches(
          snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }))
        )
    );
  }, [user]);

  return (
    <SafeAreaView style={shared.screen}>
      <ImageBackground
        source={require("../assets/background-4.png")}
        resizeMethod="auto"
        style={{
          width: "100%",
          height: "100%",
          alignItems: "center",
        }}
      >
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
              <Text style={shared.text}>No matches yet :(</Text>
            </View>
          )}
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default ChatScreen;
