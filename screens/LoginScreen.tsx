import {
  View,
  Text,
  TextInput,
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
import { shared } from "../styles/shared.styles";

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
    <SafeAreaView style={shared.screen}>
      <Text style={shared.text}>Login to Zodiac Match!</Text>

      <TextInput
        style={styled.input}
        placeholder=" Enter your e-mail"
        autoCapitalize="none"
        onChangeText={(v) => {
          setEmail(v);
        }}
        value={email}
      ></TextInput>

      <TextInput
        style={styled.input}
        placeholder=" Enter your password"
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
          <View style={shared.container}>
            <Pressable style={shared.button} onPress={signIn}>
              <Text style={shared.buttonText}>Login</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                if (navigation) {
                  navigation.navigate("CreateNewAcc");
                }
              }}
            >
              <Text style={{ color: "white" }}>
                Don't have an account yet?
                <Text style={styled.createNewAccText}> Sign up </Text>
              </Text>
            </Pressable>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

const styled = {
  input: {
    width: "70%",
    height: 40,
    backgroundColor: "white",
    borderRadius: 17,
    margin: 10,
  },
  createNewAccText: {
    color: "#444444",
    fontWeight: "bold",
  },
};

export default LoginScreen;
