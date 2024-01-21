import {
  Image,
  ImageBackground,
  Keyboard,
  Pressable,
  SafeAreaView,
  ScrollView,
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
import { updateUser, updateUserPreferences } from "../services/usersService";
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
  const [minAge, setMinAge] = useState<string>("16");
  const [maxAge, setMaxAge] = useState<string>("99");
  const [minDistance, setMinDistance] = useState<string>("0");
  const [maxDistance, setMaxDistance] = useState<string>("300");

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
          <ScrollView
            style={{
              margin: 10,
              borderRadius: 20,
            }}
          >
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
            <View>
              <Text style={[shared.text, { marginTop: 20 }]}>
                Account preferences
              </Text>
              <View style={styled.preferenceContainer}>
                <Text style={styled.preferenceLabel}>Min Age:</Text>
                <TextInput
                  style={styled.preferenceInput}
                  keyboardType="numeric"
                  onChangeText={(text) => setMinAge(text)}
                  value={minAge}
                  maxLength={2}
                />
              </View>
              <View style={styled.preferenceContainer}>
                <Text style={styled.preferenceLabel}>Max Age:</Text>
                <TextInput
                  style={styled.preferenceInput}
                  keyboardType="numeric"
                  onChangeText={(text) => setMaxAge(text)}
                  value={maxAge}
                  maxLength={2}
                />
              </View>

              <View style={styled.preferenceContainer}>
                <Text style={styled.preferenceLabel}>Min Distance (km):</Text>
                <TextInput
                  style={styled.preferenceInput}
                  keyboardType="numeric"
                  onChangeText={(text) => setMinDistance(text)}
                  value={minDistance}
                  maxLength={4}
                />
              </View>
              <View style={styled.preferenceContainer}>
                <Text style={styled.preferenceLabel}>Max Distance (km):</Text>
                <TextInput
                  style={styled.preferenceInput}
                  keyboardType="numeric"
                  onChangeText={(text) => setMaxDistance(text)}
                  value={maxDistance}
                  maxLength={4}
                />
              </View>

              <TouchableOpacity
                style={shared.button}
                onPress={() =>
                  updateUser(auth.currentUser?.uid as string, {
                    id: auth.currentUser?.uid as string,
                    userPreferences: {
                      minAge: minAge,
                      maxAge: maxAge,
                      minDistance: minDistance,
                      maxDistance: maxDistance,
                    },
                  })
                }
              >
                <Text style={[shared.text, { fontSize: 18, paddingTop: 8 }]}>
                  Save Preferences
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
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
  preferenceContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
    width: 270,
  },
  preferenceLabel: {
    color: "white",
    fontSize: 16,
  },
  preferenceInput: {
    backgroundColor: "white",
    borderRadius: 10,
    height: 40,
    width: 60,
    paddingHorizontal: 10,
    textAlign: "center",
  },
};

export default EditProfileScreen;
