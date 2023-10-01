import { View, Text } from "react-native";

const SenderMessage = ({ message }) => {
  // flex start for styling ???
  console.log(message);
  return (
    <View style={{ backgroundColor: "light-grey", alignSelf: "flex-start" }}>
      <Text style={{ color: "black" }}>{message.messages}</Text>
    </View>
  );
};

export default SenderMessage;
