import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, Text, TouchableOpacity, Image } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Uploading from "./components/Uploading";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { auth, db, storage } from "../../firebaseConfig";

const AddPicturesScreen = () => {
  const [image, setImage] = useState<any>("");
  const [progress, setProgress] = useState<any>(0);
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "profilePhotos"),
      (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            console.log(change.doc.data());
            setPhotos((prev) => [...prev, change.doc.data()]);
          }
        });
      }
    );
    return () => unsubscribe();
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
        console.log(progress);
        setProgress(progress.toFixed());
      },
      (err) => {
        console.log(err);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (download) => {
          // await setImage("");
          await saveImage(uri, new Date().toISOString());
          console.log(download);
        });
      }
    );
  };

  const saveImage = async (url, createdAt) => {
    const user = auth.currentUser?.email;
    try {
      const ref = await addDoc(collection(db, "profilePhotos"), {
        url,
        createdAt,
        user,
      } as any);
      console.log(ref.id);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SafeAreaView className="min-h-screen bg-purple-100 flex justify-center items-center">
      {image && <Uploading progress={progress} image={image} />}
      {photos && (
        <FlatList
          data={photos}
          renderItem={({ item }) => {
            return <Image source={{ uri: item.url }} />;
          }}
          keyExtractor={(item) => item.url}
        />
      )}
      <Text>To continue you have to pick at least 1 photo</Text>
      <TouchableOpacity onPress={pickImage} className="m-5">
        <Ionicons name="cloud-upload-outline" size={32}></Ionicons>
      </TouchableOpacity>
      <Text>Upload photos for your account!</Text>
    </SafeAreaView>
  );
};

export default AddPicturesScreen;
