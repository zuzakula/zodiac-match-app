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
import { useNavigation } from "@react-navigation/native";
import { shared } from "../styles/shared.styles";

const CreateAccountScreen = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const firebaseAuth = auth;
  const navigation = useNavigation();

  const signUp = async () => {
    setLoading(true);
    try {
      const res = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      ).then(() => navigation.navigate("AddPictures"));
    } catch (err) {
      alert("Registration failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <SafeAreaView style={shared.screen}>
      <View>
        <Text style={styled.createAccountText}>Sign up to Zodiac Match!</Text>
        <View style={styled.inputs}>
          <TextInput
            style={styled.input}
            placeholder=" Enter your name"
            autoCapitalize="none"
            onChangeText={(v) => {
              setName(v);
            }}
            value={name}
          ></TextInput>

          <TextInput
            style={styled.input}
            placeholder=" Enter your E-Mail"
            autoCapitalize="none"
            onChangeText={(v) => {
              setEmail(v);
            }}
            value={email}
          ></TextInput>

          <TextInput
            style={styled.input}
            placeholder=" Enter Password"
            autoCapitalize="none"
            onChangeText={(v) => {
              setPassword(v);
            }}
            value={password}
            secureTextEntry={true}
          ></TextInput>
          <TextInput
            style={styled.input}
            placeholder=" Confirm Password"
            autoCapitalize="none"
            onChangeText={(v) => {
              setConfirmPassword(v);
            }}
            value={confirmPassword}
            secureTextEntry={true}
          ></TextInput>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <>
            <View style={styled.container}>
              <Pressable style={styled.createAccountButton} onPress={signUp}>
                <Text style={styled.createAccountButtonText}>
                  Create account
                </Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  if (navigation) {
                    navigation.navigate("Login");
                  }
                }}
              >
                <Text style={{ color: "white" }}>
                  Already have an account?{" "}
                  <Text style={styled.loginText}>Login</Text>
                </Text>
              </Pressable>
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

const styled = {
  newAccountScreen: {
    position: "absolute",
    backgroundColor: "#6F78C7",
    height: "100%",
    width: "100%",
    flex: 1,
    alignItems: "center",
  },
  createAccountText: {
    color: "white",
    // position: "relative",
    // top: 80,
    margin: 20,
    fontWeight: "bold",
    fontSize: 33,
    textAlign: "center",
  },
  input: {
    height: 40,
    backgroundColor: "white",
    borderRadius: 17,
    margin: 10,
  },
  inputs: {
    marginTop: 50,
    marginBottom: 0,
  },
  createAccountButton: {
    backgroundColor: "#444444",
    borderRadius: 20,
    height: 45,
    width: 240,
    alignItems: "center",
    margin: 10,
  },
  loginText: {
    color: "#444444",
    fontWeight: "bold",
  },
  container: {
    position: "relative",
    alignItems: "center",
  },
  createAccountButtonText: {
    position: "relative",
    top: 10,
    alignItems: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
};

export default CreateAccountScreen;
