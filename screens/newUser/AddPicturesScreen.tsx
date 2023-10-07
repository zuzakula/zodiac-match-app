import { SafeAreaView } from "react-native-safe-area-context";
import { Image, StyleProp, Text, TouchableOpacity, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { auth, storage } from "../../firebaseConfig";
import ContinueButton from "../components/ContinueButton";
import shared from "../../styles/shared.styles";
import GoBackButton from "../components/GoBackButton";
import { updateUser, User } from "../../services/usersService";

const AddPicturesScreen = () => {
  const [image, setImage] = useState<any>("");

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      await uploadImage(result.assets[0].uri);
    }
  };

  const uploadImage = async (uri: string) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const storageRef = ref(storage, `ProfilePictures/` + auth.currentUser?.uid);
    const uploadTask = uploadBytesResumable(storageRef, blob);

    uploadTask.on(
      "state_changed",
      () => {},
      (err) => {
        console.log(err);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async () => {
          await saveImage(uri);
        });
      }
    );
  };

  const saveImage = async (url: string) => {
    const user: string | undefined = auth.currentUser?.uid;
    try {
      await updateUser(user as string, { url: url } as User);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SafeAreaView style={shared.screen}>
      <Text style={shared.text}>Add some pictures to your profile</Text>

      <View style={styled.block}>
        <Image
          source={{ uri: image }}
          width={120}
          height={150}
          style={styled.pic}
        />
        <TouchableOpacity style={styled.addButton} onPress={pickImage}>
          <Text style={styled.addButtonText}>Choose photo</Text>
        </TouchableOpacity>
      </View>

      <View style={styled.continue}>
        <ContinueButton navigateTo={"AboutYou"} updateBody={null} />
      </View>
      <GoBackButton goBackTo={"Home"} />
    </SafeAreaView>
  );
};

const styled: StyleProp<any> = {
  pic: {
    borderRadius: 20,
  },
  block: {
    backgroundColor: "white",
    height: 150,
    width: 120,
    margin: 10,
    borderRadius: 20,
    borderStyle: "dashed",
    borderColor: "#7E00FC",
    borderWidth: 2,
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
};

export default AddPicturesScreen;
