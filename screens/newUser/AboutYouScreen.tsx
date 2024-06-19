import {
  Alert,
  ImageBackground,
  StyleProp,
  TextInput,
  View,
} from "react-native";
import { useState } from "react";
import { Text } from "react-native";
import ContinueButton from "../components/ContinueButton";
import shared from "../../styles/shared.styles";
import GoBackButton from "../components/GoBackButton";
import React from "react";

const AboutYouScreen = () => {
  const [bio, setBio] = useState<string>("");
  const maxCharacters = 250;

  return (
    <View style={shared.screen}>
      <ImageBackground
        source={require("../../assets/background-2.png")}
        resizeMethod="auto"
        style={{
          width: "100%",
          height: "100%",
          alignItems: "center",
        }}
      >
        <Text style={[shared.text, { marginTop: 70 }]}>
          Share something more about yourself!
        </Text>
        <Text style={[shared.text, { fontSize: 15 }]}>
          Tell people what your hobbies are and what you are interested in
        </Text>
        <TextInput
          style={styled.input}
          autoCapitalize="none"
          onChangeText={(v) => {
            setBio(v);
          }}
          multiline
          numberOfLines={5}
          value={bio}
        ></TextInput>
        <Text
          style={[
            styled.characterCount,
            { color: bio.length > maxCharacters ? "red" : "black" },
          ]}
        >
          {bio.length}/{maxCharacters}
        </Text>

        <ContinueButton
          navigateTo={"Birthday"}
          updateBody={{ bio: bio }}
          isDisabled={!bio || bio.length >= 250}
        />
        <GoBackButton goBackTo={"AddPictures"} />
      </ImageBackground>
    </View>
  );
};

const styled: StyleProp<any> = {
  input: {
    height: 150,
    width: "80%",
    backgroundColor: "white",
    borderRadius: 17,
    marginTop: 80,
    textAlignVertical: "top",
    paddingHorizontal: 10,
  },
  characterCount: {
    textAlign: "right",
    color: "black",
  },
};

export default AboutYouScreen;
