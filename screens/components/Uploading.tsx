import { View, Text, TouchableOpacity, Image } from "react-native";
import { StyleSheet } from "react-native";
import ProgressBar from "./ProgressBar";

const Uploading = ({
  image,
  progress,
}: {
  image: string;
  progress: number;
}) => {
  return (
    <View style={StyleSheet.absoluteFill}>
      {image && <Image source={{ uri: image }} />}
      <Text>Uploading...</Text>
      <ProgressBar progress={progress} />
      <TouchableOpacity>
        <Text>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Uploading;
