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
import React, { SetStateAction, useEffect, useState } from "react";
import { updateUser } from "../services/usersService";
import { auth, storage } from "../firebaseConfig";
import { getDownloadURL, listAll, ref } from "firebase/storage";

const EditProfileScreen = ({ route }: any) => {
  const navigation = useNavigation();
  const { image, name: initialName, age, bio } = route.params;
  const [changedBio, setChangedBio] = useState<string>(bio);
  const maxCharacters = 250;
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<string>("");
  const [changedName, setChangedName] = useState(initialName);

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);

      try {
        const imagesRef = ref(
          storage,
          `ProfilePictures/${auth.currentUser?.uid}/`
        );
        const imageList = await listAll(imagesRef);

        const urls = await Promise.all(
          imageList.items.map(async (item) => {
            return getDownloadURL(item);
          })
        );

        setImages(urls as unknown as SetStateAction<string>);
      } catch (error) {
        console.error("Error fetching images:", error);
      }

      setLoading(false);
    };

    fetchImages();
  }, []);

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
            <View style={{ alignItems: "center" }}>
              <Image
                source={{ uri: images[0] }}
                width={200}
                height={200}
                style={{
                  borderRadius: 100,
                }}
              />
            </View>
            <Pressable
              style={shared.button}
              onPress={() => {
                if (navigation) {
                  navigation.navigate("ChangePhotos" as never);
                }
              }}
            >
              <Text style={[shared.text, { fontSize: 18, paddingTop: 8 }]}>
                Change photos
              </Text>
            </Pressable>

            <TextInput
              style={[styled.input, { height: "1.5em" }]}
              autoCapitalize="none"
              onChangeText={(text) => setChangedName(text)}
              value={changedName}
            />

            <TouchableOpacity
              style={shared.button}
              onPress={() =>
                updateUser(auth.currentUser?.uid as string, {
                  id: auth.currentUser?.uid as string,
                  name: changedName,
                }).then((r) => r)
              }
            >
              <Text style={[shared.text, { fontSize: 18, paddingTop: 8 }]}>
                Edit Name
              </Text>
            </TouchableOpacity>

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
              {changedBio.length}/{maxCharacters}
            </Text>
            <TouchableOpacity
              style={shared.button}
              onPress={() => {
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
