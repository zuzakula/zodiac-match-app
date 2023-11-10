import { TouchableOpacity, View, Image, StyleProp } from "react-native";
import { useEffect, useState } from "react";
import { auth, storage } from "../../firebaseConfig";
import { Ionicons } from "@expo/vector-icons";
import { signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { getDownloadURL, ref } from "firebase/storage";

const Header = () => {
  const navigation = useNavigation();
  const [image, setImage] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getDownloadURL(ref(storage, `ProfilePictures/${auth.currentUser?.uid}`))
      .then((url) => setImage(url))
      .then(() => setLoading(false));
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
          {!loading && (
            <Image
              style={styled.profilePic}
              source={{ uri: image }}
              width={50}
              height={50}
            />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            if (navigation) {
              navigation.navigate("Home" as never);
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
              navigation.navigate("Chat" as never);
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

const styled: StyleProp<any> = {
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
