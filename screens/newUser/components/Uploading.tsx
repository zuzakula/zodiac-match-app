import { View, Text, TouchableOpacity, Image } from "react-native";
import { StyleSheet } from "react-native";
import ProgressBar from "./ProgressBar";

const Uploading = ({ image, progress }) => {
  console.log(image);
  return (
    <View style={StyleSheet.absoluteFill} className="items-center mt-40">
      {image && <Image source={{ uri: image }} />}
      <Text className="mb-3">Uploading...</Text>
      <ProgressBar progress={progress} />
      <TouchableOpacity className="mt-3">
        <Text>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Uploading;
