import { Text } from "react-native";

const ReceiverMessage = ({ message }) => {
  return <Text style={styled.message}>{message.messages}</Text>;
};

const styled = {
  message: {
    backgroundColor: "#6c82c4",
    alignSelf: "flex-start",
    color: "white",
    marginBottom: 10,
    padding: 10,
    borderRadius: 20,
    verticalAlign: "middle",
    marginLeft: 5,
    transform: [{ scaleY: -1 }],
  },
};

export default ReceiverMessage;
