import { StyleProp } from "react-native";

const shared: StyleProp<any> = {
  screen: {
    position: "absolute",
    backgroundColor: "#6F78C7",
    height: "100%",
    width: "100%",
    flex: 1,
    alignItems: "center",
  },
  button: {
    backgroundColor: "#444444",
    borderRadius: 20,
    height: 45,
    width: 240,
    alignItems: "center",
    margin: 10,
  },
  buttonText: {
    position: "relative",
    top: 10,
    alignItems: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 30,
    textAlign: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
  },
  input: {
    width: 250,
    padding: 10,
    height: 40,
    backgroundColor: "white",
    borderRadius: 17,
    margin: 10,
  },
};

export default shared;
