import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  getStorage,
} from "firebase/storage";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { auth, db, storage } from "../../firebaseConfig";
import uuid from "react-native-uuid";
import Button from "../components/Button";
import shared from "../../styles/shared.styles";
import Icon from "react-native-vector-icons";

const AddPicturesScreen = () => {
  const [image, setImage] = useState<any>("");
  const [progress, setProgress] = useState<any>(0);
  const [photos, setPhotos] = useState([]);
  const [data, setData] = useState([
    { id: 1, url: "" },
    { id: 2, url: "" },
    { id: 3, url: "" },
    { id: 4, url: "" },
  ]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "profilePhotos"),
      (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            setPhotos((prev) => [...prev, change.doc.data()]);
          }
        });
      }
    );
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const getImages = async () => {
      const storage = getStorage();
      const reference = ref(storage);
    };
  }, []);

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

  const uploadImage = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const storageRef = ref(storage, "ProfilePictures/" + new Date().getTime());
    const uploadTask = uploadBytesResumable(storageRef, blob);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress.toFixed());
      },
      (err) => {
        console.log(err);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (download) => {
          await setImage("");
          await saveImage(uri, new Date().toISOString());
        });
      }
    );
  };

  const saveImage = async (url, createdAt) => {
    const user = auth.currentUser?.email;
    const id = uuid.v4();
    try {
      const ref = await addDoc(collection(db, "profilePhotos"), {
        id,
        url,
        createdAt,
        user,
      } as any);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SafeAreaView style={shared.screen}>
      <Text style={shared.text}>Add some pictures to your profile</Text>

      {/*{image && <Uploading progress={progress} image={image} />}*/}

      <FlatList
        data={data}
        renderItem={() => (
          <View style={styled.pic}>
            <Image
              source="https://picsum.photos/id/237/200/300"
              width={120}
              height={150}
            />
            <TouchableOpacity onPress={pickImage}>
              <Text style={styled.addButton}>+</Text>
            </TouchableOpacity>
          </View>
        )}
        numColumns={2}
        keyExtractor={(item) => item.id}
      />

      <Text>To continue you have to pick at least 1 photo</Text>
      <TouchableOpacity onPress={pickImage} className="m-5">
        <Text>ADD</Text>
      </TouchableOpacity>
      <Text>Upload photos for your account!</Text>

      <Button navigateTo={"AboutYou"} />
    </SafeAreaView>
  );
};

const styled = {
  pic: {
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
    position: "relative",
    top: -10,
    left: 90,
    backgroundColor: "#7E00FC",
    height: 35,
    width: 35,
    borderRadius: 20,
    color: "white",
    textAlign: "center",
    textAlignVertical: "center",
    justifyContent: "center",
    fontSize: 30,
    // display: "none",
  },
};

export default AddPicturesScreen;
