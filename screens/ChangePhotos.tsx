import shared from "../styles/shared.styles";
import {
  Image,
  ImageBackground,
  SafeAreaView,
  StyleProp,
  TouchableOpacity,
  View,
} from "react-native";
import { Text } from "react-native";
import { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { uploadImage } from "../services/imagesService";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import firebase from "firebase/compat";
import { auth, storage } from "../firebaseConfig";

const ChangePhotos = () => {
  const navigation = useNavigation();
  const [images, setImages] = useState<any>([]);
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

        setImages(urls);
      } catch (error) {
        console.error("Error fetching images:", error);
      }

      setLoading(false);
    };

    fetchImages();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });

    if (!result.canceled) {
      const newImages = [...images, result.assets[0].uri];
      setImages(newImages);
      await uploadImage(result.assets[0].uri);
    }
  };

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
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{ marginTop: 30 }}
        >
          <AntDesign name="back" size={40} color="white" />
        </TouchableOpacity>
        <Text style={[shared.text, { margin: 50 }]}>
          Change pictures for your profile
        </Text>
        <View style={styled.row}>
          <View style={styled.block}>
            <TouchableOpacity onPress={pickImage}>
              <Image
                source={{ uri: images[0] }}
                width={183}
                height={250}
                style={styled.pic}
              />
            </TouchableOpacity>
          </View>

          <View style={styled.block}>
            <TouchableOpacity onPress={pickImage}>
              <Image
                source={{ uri: images[1] }}
                width={183}
                height={250}
                style={styled.pic}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styled.row}>
          <View style={styled.block}>
            <TouchableOpacity onPress={pickImage}>
              <Image
                source={{ uri: images[2] }}
                width={183}
                height={250}
                style={styled.pic}
              />
            </TouchableOpacity>
          </View>

          <View style={styled.block}>
            <TouchableOpacity onPress={pickImage}>
              <Image
                source={{ uri: images[3] }}
                width={183}
                height={250}
                style={styled.pic}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styled: StyleProp<any> = {
  pic: {
    borderRadius: 20,
  },
  block: {
    backgroundColor: "white",
    height: 250,
    width: 120,
    margin: 10,
    borderRadius: 20,
    borderStyle: "dashed",
    borderColor: "#7E00FC",
    borderWidth: 2,
    flex: 1,
  },
  continue: {
    marginTop: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
};

export default ChangePhotos;
