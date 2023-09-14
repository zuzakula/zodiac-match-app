import {
  View,
  Text,
  Button,
  TextInput,
  Image,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { useState } from "react";
import { auth } from "../firebaseConfig";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";

const LoginScreen = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigation = useNavigation();
  const firebaseAuth = auth;

  const signIn = async () => {
    setLoading(true);
    try {
      const res = await signInWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );
    } catch (err) {
      alert("Sign in failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async () => {
    setLoading(true);
    try {
      const res = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );
    } catch (err) {
      alert("Registration failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="min-h-screen bg-purple-300 flex justify-center items-center">
      <View className="py-12 px-12 bg-white rounded-2xl z-20 space-y-4">
        <Text className="text-3xl font-bold text-center mb-4 cursor-pointer tracking-wide">
          Login to the app
        </Text>
        <TextInput
          className="block text-sm py-3 px-4 rounded-lg border outline-none"
          placeholder="E-Mail"
          autoCapitalize="none"
          onChangeText={(v) => {
            setEmail(v);
          }}
          value={email}
        ></TextInput>

        <TextInput
          className="block text-sm py-3 px-4 rounded-lg border outline-none"
          placeholder="Password"
          autoCapitalize="none"
          onChangeText={(v) => {
            setPassword(v);
          }}
          value={password}
          secureTextEntry={true}
        ></TextInput>

        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <>
            <Pressable
              className="bg-purple-400 h-10 px-4 items-center justify-center rounded-lg mt-4 mb-4"
              onPress={signIn}
            >
              <Text className="text-white text-bold">Sign in</Text>
            </Pressable>
            <Text className="text-center mb-4 cursor-pointer">
              Don't have an account yet?
            </Text>
            <Pressable
              className="bg-purple-400 h-10 px-4 items-center justify-center rounded-lg"
              onPress={() => {
                if (navigation) {
                  navigation.navigate("CreateNewAcc");
                }
              }}
            >
              <Text className="text-white text-bold">Create it here</Text>
            </Pressable>
          </>
        )}
        {/*<Button title="login with google" onPress={() => promptAsync()} />*/}
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
