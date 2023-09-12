import { SafeAreaView } from "react-native-safe-area-context";
import {
  ActivityIndicator,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebaseConfig";

const CreateAccountScreen = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const firebaseAuth = auth;

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
          Create New Account
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
        <TextInput
          className="block text-sm py-3 px-4 rounded-lg border outline-none"
          placeholder="Confirm Password"
          autoCapitalize="none"
          onChangeText={(v) => {
            setConfirmPassword(v);
          }}
          value={confirmPassword}
          secureTextEntry={true}
        ></TextInput>

        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <Pressable
            className="bg-purple-400 h-10 px-4 items-center justify-center rounded-lg"
            onPress={signUp}
          >
            <Text className="text-white text-bold">Create account</Text>
          </Pressable>
        )}
      </View>
    </SafeAreaView>
  );
};

export default CreateAccountScreen;
