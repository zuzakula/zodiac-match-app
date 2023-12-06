import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import shared from "../styles/shared.styles";
import { useEffect, useState } from "react";
import { getDownloadURL, ref } from "firebase/storage";
import { auth, storage } from "../firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import { findUser } from "../services/usersService";
import { getZodiacInfo } from "../services/zodiacInfo";
import { AntDesign } from "@expo/vector-icons";
import { signOut } from "firebase/auth";

const SettingsScreen = () => {
  const [image, setImage] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [zodiac, setZodiac] = useState<string>("");
  const [aboutZodiac, setAboutZodiac] = useState<string>("");
  const [compatibility, setCompatibility] = useState<string>("");
  const [age, setAge] = useState<number>(null);
  const navigation = useNavigation();
  const [loadingCompatibility, setLoadingCompatibility] =
    useState<boolean>(true);

  useEffect(() => {
    getDownloadURL(
      ref(storage, `ProfilePictures/${auth.currentUser?.uid}`)
    ).then((url) => setImage(url));

    findUser(auth.currentUser?.uid as string).then((res) => {
      setName(res.name);
      setZodiac(res.zodiacSign);
      setAge(res.age);
    });

    getZodiacInfo(zodiac.toLowerCase())
      .then((res) => {
        setAboutZodiac(res.about);
        setCompatibility(res.compatibility);
      })
      .finally(() => {
        // Set loading state to false when the request is completed
        setLoadingCompatibility(false);
      });
  }, [zodiac]);

  return (
    <SafeAreaView style={shared.screen}>
      <ImageBackground
        source={require("../assets/background-1.png")}
        resizeMethod="auto"
        style={{
          width: "100%",
          height: "100%",
          alignItems: "center",
        }}
      >
        <ScrollView>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "center",
              gap: 250,
              marginTop: "7%",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
            >
              <AntDesign name="back" size={40} color="white" />
            </TouchableOpacity>
            <TouchableOpacity>
              <AntDesign
                name="edit"
                size={40}
                color="white"
                style={{ marginLeft: 20 }}
              />
            </TouchableOpacity>
          </View>
          <View style={{ alignItems: "center" }}>
            <Image
              source={{ uri: image }}
              width={200}
              height={200}
              style={{
                borderRadius: 100,
              }}
            />
          </View>
          <Text style={[shared.text]}>
            {name}, {age}
          </Text>

          <Text style={[shared.text, { color: "#7E00FC" }]}>
            Your Zodiac Sign is:
          </Text>
          <Text style={[shared.text]}>{zodiac}</Text>
          <Text
            style={[
              shared.text,
              { marginTop: 0, fontSize: 23, color: "#7E00FC" },
            ]}
          >
            You are most compatible with:{" "}
          </Text>
          {loadingCompatibility ? (
            <ActivityIndicator size="large" color="#7E00FC" />
          ) : (
            compatibility && (
              <Text style={[shared.text, { marginTop: 0 }]}>
                {compatibility}
              </Text>
            )
          )}

          {aboutZodiac && (
            <Text
              style={{
                color: "white",
                margin: 20,
                textAlign: "justify",
                fontSize: 20,
              }}
            >
              {aboutZodiac}
            </Text>
          )}
          <TouchableOpacity
            onPress={() =>
              signOut(auth)
                .then(() => {})
                .catch((err) => alert(err))
            }
          >
            <AntDesign
              name="logout"
              size={40}
              color="white"
              style={{ marginLeft: 20 }}
            />
          </TouchableOpacity>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default SettingsScreen;
