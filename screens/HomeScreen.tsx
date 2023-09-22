import { View, Text, Pressable, TouchableOpacity, Image } from "react-native";
import { auth } from "../firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import shared from "../styles/shared.styles";
import { useEffect, useState } from "react";
import { findAllUsers, findPicture, findUser } from "../services/usersService";
import Header from "./components/Header";
import Card from "./components/Card";
import Swiper from "react-native-deck-swiper";

const xd = [{ name: "Zuza" }, { name: "Wika" }];

const HomeScreen = () => {
  const navigation = useNavigation();
  const [image, setImage] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [sun, setSun] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    findPicture(auth.currentUser?.email).then((res) => setImage(res.url));
    findUser(auth.currentUser?.email).then((res) => setName(res.name));
    findAllUsers().then((res) => {
      setUsers(res);
    });
  }, []);

  return (
    <SafeAreaView style={shared.screen}>
      <Header />

      <View style={{ flex: 1, left: "-45%" }}>
        <Swiper
          cards={users}
          containerStyle={styled.containerCard}
          renderCard={(card) => {
            if (card) {
              return (
                <View
                  style={{
                    backgroundColor: "white",
                    borderRadius: 20,
                    height: "80%",
                    width: "90%",
                  }}
                >
                  <Image source={{ uri: card.url }} style={styled.image} />
                  <Text style={styled.name}>{card.name}</Text>
                  <Text style={styled.bigThree}>
                    ☀️Saggitarius {"\n"} 🌜Leo {"\n"} ⬆️Saggitarius {"\n"}
                  </Text>
                </View>
              );
            }
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styled = {
  card: {
    marginTop: 10,
  },
  containerCard: {},
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
};

export default HomeScreen;
