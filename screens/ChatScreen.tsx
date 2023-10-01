import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "./components/Header";
import shared from "../styles/shared.styles";
import ChatList from "./components/ChatList";

const ChatScreen = () => {
  return (
    <SafeAreaView style={shared.screen}>
      <Header />
      <ChatList />
    </SafeAreaView>
  );
};

export default ChatScreen;
