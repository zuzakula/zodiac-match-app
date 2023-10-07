import {
  SafeAreaView,
  Text,
  Image,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { auth, db } from "../firebaseConfig";
import { useEffect, useState } from "react";
import { getMatchedUserInfo } from "../lib/getMatchedUserInfo";
import shared from "../styles/shared.styles";
import SenderMessage from "./components/SenderMessage";
import ReceiverMessage from "./components/ReceiverMessage";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

const MessageScreen = (props: any) => {
  const navigation = useNavigation();
  const user = auth.currentUser;
  const [matchUserInfo, setMatchUserInfo] = useState<any>(null);
  const { params }: any = useRoute();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<any>([]);

  const { matchDetails } = params;

  useEffect(() => {
    setMatchUserInfo(getMatchedUserInfo(matchDetails.users, user?.uid) as any);
  }, []);

  const sendMessage = () => {
    addDoc(collection(db, "Matches", matchDetails.id, "Messages"), {
      timestamp: new Date(),
      userId: user?.uid,
      name: user?.displayName,
      // photoUrl: matchDetails.users[user?.uid].photoUrl,
      messages: input,
    }).then((r) => console.log(r));

    setInput("");
  };

  useEffect(() => {
    onSnapshot(
      query(
        collection(db, "Matches", matchDetails.id, "Messages"),
        orderBy("timestamp", "desc")
      ),
      (snapshot: any) => {
        setMessages(
          snapshot.docs.map((doc: any) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
      }
    );
  }, [matchDetails, db]);

  return (
    <SafeAreaView style={shared.screen}>
      {matchUserInfo && (
        <>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Image
              style={styled.matchPic}
              source={{ uri: matchUserInfo.url }}
              width={50}
              height={50}
            />
          </TouchableOpacity>
          <Text style={[shared.text, { marginTop: 0 }]}>
            {matchUserInfo.name}
          </Text>
        </>
      )}

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={10}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <FlatList
            data={messages}
            style={{
              transform: [{ scaleY: -1 }],
              height: "70%",
              backgroundColor: "white",
              borderRadius: 20,
            }}
            renderItem={({ item: message }) =>
              message.userId === user?.uid ? (
                <SenderMessage key={message.id} message={message} />
              ) : (
                <ReceiverMessage key={message.id} message={message} />
              )
            }
            keyExtractor={(item) => item.id}
          />
        </TouchableWithoutFeedback>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <TextInput
            placeholder="Send Message..."
            style={[
              shared.input,
              {
                width: 280,
                paddingLeft: 15,
              },
            ]}
            onSubmitEditing={sendMessage}
            onChangeText={setInput}
            value={input}
          ></TextInput>
          <TouchableOpacity
            onPress={sendMessage}
            style={[shared.button, { height: 40, width: 70 }]}
          >
            <Text style={shared.buttonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styled = {
  matchPic: {
    borderRadius: 50,
    margin: 5,
  },
};

export default MessageScreen;
