import { Text, View, Image } from "react-native";

const ReceiverMessage = ({ message }) => {
  return (
    <View style={{ backgroundColor: "blue", alignSelf: "flex-start" }}>
      <Image source={{ uri: message.photoUrl }} />
      <Text style={{ color: "white" }}>{message.messages}</Text>
    </View>
  );
};

export default ReceiverMessage;
