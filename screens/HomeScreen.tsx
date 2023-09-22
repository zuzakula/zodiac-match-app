import { View, Text, Pressable, TouchableOpacity, Image } from "react-native";
import { auth } from "../firebaseConfig";
import { signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import shared from "../styles/shared.styles";
import { useEffect, useState } from "react";
import { findAllPictures, findAllUsers } from "../services/usersService";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [image, setImage] = useState<string>("");

  useEffect(() => {
    findAllPictures().then((res) => setImage(res[1].url));
    findAllUsers().then((r) => console.log(r));
  }, []);

  return (
    <SafeAreaView style={shared.screen}>
      <View style={styled.card}>
        <TouchableOpacity>
          {image && (
            <>
              <Image
                source={{ uri: image }}
                width={200}
                height={230}
                style={styled.image}
              />
              <Text style={styled.name}> Wiktoria 21 </Text>
              <Text style={styled.bigThree}>
                ☀️Saggitarius {"\n"} 🌜Saggitarius {"\n"} ⬆️Saggitarius {"\n"}
              </Text>
              <Pressable style={[styled.button, styled.dislike]}>
                <Text style={styled.buttonText}>NO</Text>
              </Pressable>
              <Pressable style={[styled.button, styled.like]}>
                <Text style={styled.buttonText}>YES</Text>
              </Pressable>
            </>
          )}
        </TouchableOpacity>
      </View>

      <View style={{ position: "relative", top: 600 }}>
        <Pressable
          style={shared.button}
          onPress={() => {
            if (navigation) {
              navigation.navigate("Chat");
            }
          }}
        >
          <Text style={shared.buttonText}>Go to Chat</Text>
        </Pressable>
        <Pressable
          style={shared.button}
          onPress={() => {
            if (navigation) {
              navigation.navigate("AddPictures");
            }
          }}
        >
          <Text style={shared.buttonText}>Adding Pictures</Text>
        </Pressable>
        <Pressable
          style={shared.button}
          onPress={() =>
            signOut(auth)
              .then(() => {})
              .catch((err) => alert(err))
          }
        >
          <Text style={shared.buttonText}>Sign Out</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styled = {
  card: {
    position: "absolute",
    margin: 70,
    height: "70%",
    width: 300,
    backgroundColor: "white",
    borderRadius: 20,
  },
  image: {
    width: "90%",
    height: "65%",
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
