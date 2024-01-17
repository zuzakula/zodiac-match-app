import {
  Image,
  ImageBackground,
  Keyboard,
  Pressable,
  SafeAreaView,
  StyleProp,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import shared from "../styles/shared.styles";
import React, { useState } from "react";
import { updateUser } from "../services/usersService";
import { auth } from "../firebaseConfig";

const EditProfileScreen = ({ route }) => {
  const navigation = useNavigation();
  const { image, name, age, bio } = route.params;
  const [changedBio, setChangedBio] = useState<string>(bio);
  const maxCharacters = 250;

  console.log(bio);

  return (
    <SafeAreaView>
      <ImageBackground
        source={require("../assets/background-1.png")}
        resizeMethod="auto"
        style={{
          width: "100%",
          height: "100%",
          alignItems: "center",
        }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
              style={{ marginTop: 30 }}
            >
              <AntDesign name="back" size={40} color="white" />
            </TouchableOpacity>

            <View style={{ alignItems: "center" }}>
              {image && (
                <Image
                  source={{ uri: image }}
                  width={200}
                  height={200}
                  style={{
                    borderRadius: 100,
                  }}
                />
              )}
            </View>
            <Pressable style={shared.button}>
              <Text style={[shared.text, { fontSize: 18, paddingTop: 8 }]}>
                Change main photo
              </Text>
            </Pressable>
            <Text style={[shared.text, { marginBottom: 0 }]}>
              {name}, {age}
            </Text>

            <TextInput
              style={styled.input}
              autoCapitalize="none"
              onChangeText={(v) => {
                setChangedBio(v);
              }}
              multiline
              numberOfLines={5}
              value={changedBio}
            ></TextInput>

            <Text style={styled.characterCount}>
              {bio.length}/{maxCharacters}
            </Text>
            <TouchableOpacity
              style={shared.button}
              onPress={() => {
                console.log("xd");
                updateUser(auth.currentUser?.uid as string, {
                  id: auth.currentUser?.uid as string,
                  bio: changedBio,
                }).then((r) => r);
              }}
            >
              <Text style={[shared.text, { fontSize: 18, paddingTop: 8 }]}>
                Edit bio
              </Text>
            </TouchableOpacity>
            <View>
              <Text>Preferred distance</Text>
              <Slider minimumValue={18} maximumValue={60} progress={1} />
              <Text>Preferred age gapm</Text>
              <Slider minimumValue={18} maximumValue={60} progress={1} />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styled: StyleProp<any> = {
  input: {
    height: 150,
    width: 270,
    backgroundColor: "white",
    borderRadius: 17,
    marginTop: 20,
    textAlignVertical: "top",
    paddingHorizontal: 10,
  },
  characterCount: {
    textAlign: "right",
    color: "black",
  },
};

export default EditProfileScreen;
