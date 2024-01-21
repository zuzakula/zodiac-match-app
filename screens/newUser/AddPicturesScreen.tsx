import {
  Image,
  ImageBackground,
  StyleProp,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import ContinueButton from "../components/ContinueButton";
import shared from "../../styles/shared.styles";
import GoBackButton from "../components/GoBackButton";
import { uploadImage } from "../../services/imagesService";

const AddPicturesScreen = () => {
  const [images, setImages] = useState<any>([]);

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
    <View style={shared.screen}>
      <ImageBackground
        source={require("../../assets/background-1.png")}
        resizeMethod="auto"
        style={{
          width: "100%",
          height: "100%",
          alignItems: "center",
        }}
      >
        <Text style={[shared.text, { margin: 50 }]}>
          Add pictures to your profile
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

        <View style={styled.continue}>
          <ContinueButton
            navigateTo={"AboutYou"}
            updateBody={null}
            isDisabled={!images.length}
          />
        </View>
      </ImageBackground>
    </View>
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
  addButton: {
    height: 35,
    width: 150,
    backgroundColor: "#A6ABDE",
    borderRadius: 20,
    marginTop: 20,
    left: -15,
  },
  addButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
    height: 35,
    width: 150,
    verticalAlign: "middle",
  },
  continue: {
    marginTop: 100,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
};

export default AddPicturesScreen;
