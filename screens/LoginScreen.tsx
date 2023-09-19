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
    <SafeAreaView style={styled.loginScreen}>
      <Text style={styled.loginText}>Login to Zodiac Match!</Text>

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
          <View style={styled.signIn}>
            <Pressable style={styled.loginButton} onPress={signIn}>
              <Text style={styled.loginButtonText}>Login</Text>
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
                <Text style={styled.createNewAccText}>Sign up</Text>
              </Text>
            </Pressable>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

const styled = {
  loginScreen: {
    position: "absolute",
    backgroundColor: "#6F78C7",
    height: "100%",
    width: "100%",
    flex: 1,
    alignItems: "center",
  },
  loginButtonText: {
    position: "relative",
    top: 10,
    alignItems: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: "#444444",
    borderRadius: 20,
    height: 45,
    width: 240,
    alignItems: "center",
    margin: 10,
  },
  loginText: {
    color: "white",
    margin: 20,
    marginBottom: 250,
    fontWeight: "bold",
    fontSize: 33,
    textAlign: "center",
  },
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
  signIn: {
    position: "relative",
    top: 0,
    flex: 1,
    alignItems: "center",
  },
};

export default LoginScreen;
