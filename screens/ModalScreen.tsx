import { View, Text, TextInput } from "react-native";
import { useEffect, useState } from "react";
import { findUser } from "../services/usersService";
// @ts-ignore
import { auth } from "../firebaseConfig";

const ModalScreen = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    findUser(auth.currentUser?.uid as string).then((res) =>
      setUsername(res?.name)
    );
  });

  return (
    <View>
      <Text style={styles.welcomeText}>Welcome {username} </Text>

      <TextInput style={styles.input} placeholder="Enter ....." />

      <TextInput style={styles.input} placeholder="Enter birthday ..." />
    </View>
  );
};

const styles = {
  welcomeText: {
    fontSize: 20,
  },
  input: {},
};

export default ModalScreen;
