import { TouchableOpacity, View, Image, StyleProp } from "react-native";
import { SetStateAction, useEffect, useState } from "react";
import { auth, storage } from "../../firebaseConfig";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { getDownloadURL, listAll, ref } from "firebase/storage";

const Header = () => {
  const navigation = useNavigation();
  const [images, setImages] = useState<string>("");
  const [loading, setLoading] = useState(false);

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
    <>
      <View style={styled.header}>
        <TouchableOpacity
          onPress={() =>
            // signOut(auth)
            //   .then(() => {})
            //   .catch((err) => alert(err))
            navigation.navigate("Settings" as never)
          }
        >
          {!loading && (
            <Image
              style={styled.profilePic}
              source={{ uri: images[0] }}
              width={50}
              height={50}
            />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            if (navigation) {
              navigation.navigate("HomeScreen" as never);
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
