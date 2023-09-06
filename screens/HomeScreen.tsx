import { View, Text, Button, Pressable } from "react-native";
import { auth } from "../firebaseConfig";
import { signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const navigation = useNavigation();
  return (
    <View className=" min-h-screen flex justify-center items-center py-12 px-12 bg-white rounded-2xl z-20 space-y-4">
      <Text className="text-3xl font-bold">Hello!</Text>
      <Pressable
        className="bg-purple-500 h-10 px-4 items-center justify-center rounded-lg"
        onPress={() => {
          if (navigation) {
            navigation.navigate("Chat");
          }
        }}
      >
        <Text className="text-white text-bold">Go to Chat</Text>
      </Pressable>
      <Pressable
        className="bg-purple-400 h-10 px-4 items-center justify-center rounded-lg"
        onPress={() =>
          signOut(auth)
            .then(() => {})
            .catch((err) => alert(err))
        }
      >
        <Text className="text-white text-bold">Sign Out</Text>
      </Pressable>
    </View>
  );
};

export default HomeScreen;
