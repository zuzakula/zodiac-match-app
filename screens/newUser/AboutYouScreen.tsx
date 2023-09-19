import { SafeAreaView, TextInput } from "react-native";
import { useState } from "react";
import { View, Text, ActivityIndicator, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ContinueButton from "./components/ContinueButton";

const AboutYouScreen = () => {
  const [bio, setBio] = useState<string>("");
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styled.aboutYouScreen}>
      <Text style={styled.text}>Share something more about yourself!</Text>
      <Text style={styled.text}>
        Tell people what your hobbies are and what you are interested in
      </Text>
      <TextInput
        style={styled.input}
        autoCapitalize="none"
        onChangeText={(v) => {
          setBio(v);
        }}
        value={bio}
      ></TextInput>

      <ContinueButton navigateTo={"Birthday"} />
    </SafeAreaView>
  );
};

const styled = {
  aboutYouScreen: {
    position: "absolute",
    backgroundColor: "#6F78C7",
    height: "100%",
    width: "100%",
    flex: 1,
    alignItems: "center",
  },
  text: {
    color: "white",
    marginTop: 40,
    fontWeight: "bold",
    fontSize: 30,
    textAlign: "center",
  },
  input: {
    height: 150,
    width: "80%",
    backgroundColor: "white",
    borderRadius: 17,
    marginTop: 80,
  },
  continueButton: {
    backgroundColor: "#444444",
    borderRadius: 20,
    height: 45,
    width: 240,
    alignItems: "center",
    margin: 10,
  },
  continueButtonText: {
    position: "relative",
    top: 10,
    alignItems: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
};

export default AboutYouScreen;
