import { TouchableOpacity, View, Text, Image } from "react-native";
import { useEffect, useState } from "react";
import { findUser } from "../../services/usersService";
import { auth } from "../../firebaseConfig";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import { signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

const Header = () => {
  const navigation = useNavigation();
  const [image, setImage] = useState<string>("");

  useEffect(() => {
    findUser(auth.currentUser?.uid).then((res) => setImage(res.url));
  }, []);

  return (
    <>
      <View style={styled.header}>
        <TouchableOpacity
          onPress={() =>
            signOut(auth)
              .then(() => {})
              .catch((err) => alert(err))
          }
        >
          <Image
            style={styled.profilePic}
            source={{ uri: image }}
            width={50}
            height={50}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            if (navigation) {
              navigation.navigate("Home");
              // navigation.navigate("Modal");
            }
          }}
        >
          <Image
            source={require("../../assets/logo.png")}
            style={styled.logo}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            if (navigation) {
              navigation.navigate("Chat");
            }
          }}
        >
          <Ionicons
            name="chatbubbles-sharp"
            size={40}
            style={styled.chatIcon}
          />
        </TouchableOpacity>
      </View>
    </>
  );
};

const styled = {
  header: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  profilePic: {
    borderRadius: 50,
  },
  logo: {
    borderRadius: 20,
    height: 60,
    width: 60,
    marginRight: 110,
    marginLeft: 110,
  },
  chatIcon: {
    color: "white",
  },
};

export default Header;
