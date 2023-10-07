import { StyleProp, Text } from "react-native";

const SenderMessage = ({ message }: { message: any }) => {
  return <Text style={styled.message}>{message.messages}</Text>;
};

const styled: StyleProp<any> = {
  message: {
    color: "black",
    textAlign: "right",
    alignSelf: "flex-end",
    backgroundColor: "#ced3de",
    marginBottom: 10,
    padding: 10,
    borderRadius: 20,
    verticalAlign: "middle",
    marginRight: 5,
    transform: [{ scaleY: -1 }],
  },
};

export default SenderMessage;
