import { View, Text, Pressable, TouchableOpacity, Image } from "react-native";
import { auth } from "../firebaseConfig";
import { signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView className=" min-h-screen py-12 px-12 bg-white rounded-2xl z-20 space-y-4">
      <View>
        <TouchableOpacity>
          <Image source={{ uri: auth.currentUser.photoURL }} />
        </TouchableOpacity>
      </View>
      <Text className="text-3xl font-bold">
        Hello {auth.currentUser?.email}!
      </Text>
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
    </SafeAreaView>
  );
};

export default HomeScreen;
