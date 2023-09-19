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
        <Text style={shared.text}>Sign up to Zodiac Match!</Text>
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
            <View style={shared.container}>
              <Pressable style={shared.button} onPress={signUp}>
                <Text style={shared.buttonText}>Create account</Text>
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
  loginText: {
    color: "#444444",
    fontWeight: "bold",
  },
};

export default CreateAccountScreen;
