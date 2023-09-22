import { View, Text, Pressable, TouchableOpacity, Image } from "react-native";
import { auth } from "../firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import shared from "../styles/shared.styles";
import { useEffect, useState } from "react";
import { findPicture } from "../services/usersService";
import Header from "./components/Header";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [image, setImage] = useState<string>("");

  useEffect(() => {
    findPicture(auth.currentUser?.email).then((res) => setImage(res.url));
  }, []);

  return (
    <SafeAreaView style={shared.screen}>
      <Header />
      <View style={styled.card}>
        <TouchableOpacity>
          {image && (
            <>
              <Image source={{ uri: image }} style={styled.image} />
              <View style={styled.userInfo}>
                <Text style={styled.name}> Wiktoria 21 </Text>
                <Text style={styled.bigThree}>
                  ☀️Saggitarius {"\n"} 🌜Leo {"\n"} ⬆️Saggitarius {"\n"}
                </Text>
              </View>
            </>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styled = {
  card: {
    position: "absolute",
    margin: 110,
    height: "80%",
    width: "90%",
    backgroundColor: "white",
    borderRadius: 20,
  },
  userInfo: {
    marginTop: 10,
  },
  image: {
    width: "95%",
    height: "75%",
    marginTop: 10,
    marginBottom: 0,
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 20,
  },
  name: {
    fontSize: 30,
    textAlign: "center",
    fontWeight: "bold",
  },
  bigThree: {
    fontSize: 16,
    textAlign: "center",
  },
  button: {
    height: 60,
    width: 60,
    backgroundColor: "#A6ABDE",
    borderRadius: 50,
    position: "relative",
    textAlign: "center",
    borderWidth: 3,
    borderColor: "white",
  },
  buttonText: {
    fontSize: 25,
    textAlign: "center",
    verticalAlign: "middle",
    height: 60,
    width: 60,
    fontWeight: "bold",
    color: "white",
  },
  dislike: {
    left: 0,
    top: -10,
  },
  like: {
    left: 260,
    top: -65,
  },
};

export default HomeScreen;
