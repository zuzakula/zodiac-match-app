import { SafeAreaView, TextInput } from "react-native";
import { useState } from "react";
import { Text } from "react-native";
import ContinueButton from "../components/ContinueButton";
import shared from "../../styles/shared.styles";
import GoBackButton from "../components/GoBackButton";

const AboutYouScreen = () => {
  const [bio, setBio] = useState<string>("");

  return (
    <SafeAreaView style={shared.screen}>
      <Text style={shared.text}>Share something more about yourself!</Text>
      <Text style={shared.text}>
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

      <ContinueButton navigateTo={"Birthday"} updateBody={{ bio: bio }} />
      <GoBackButton goBackTo={"AddPictures"} />
    </SafeAreaView>
  );
};

const styled = {
  input: {
    height: 150,
    width: "80%",
    backgroundColor: "white",
    borderRadius: 17,
    marginTop: 80,
  },
};

export default AboutYouScreen;
