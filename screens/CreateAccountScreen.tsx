import { SafeAreaView } from "react-native-safe-area-context";
import {
  ActivityIndicator,
  ImageBackground,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import shared from "../styles/shared.styles";
import { createUser } from "../services/usersService";

const CreateAccountScreen = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const firebaseAuth = auth;
  const navigation = useNavigation();

  const incompleteForm = false; // to do form validation !name || !confirmPassword

  const signUp = async () => {
    setLoading(true);
    try {
      const res = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      ).then(() => navigation.navigate("AddPictures"));

      createUser({ id: auth.currentUser?.uid, email: email, name: name }).then(
        (res) => res
      );
    } catch (err) {
      alert("Registration failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={shared.screen}>
      <ImageBackground
        source={require("../assets/background-1.png")}
        resizeMethod="auto"
        style={{
          width: "100%",
          height: "100%",
          alignItems: "center",
        }}
      >
        <Text style={shared.text}>Sign up to Zodiac Match!</Text>
        <View style={[shared.container, { marginTop: 60 }]}>
          <TextInput
            style={shared.input}
            placeholder=" Enter your name"
            autoCapitalize="none"
            onChangeText={(v) => {
              setName(v);
            }}
            value={name}
          ></TextInput>

          <TextInput
            style={shared.input}
            placeholder=" Enter your E-Mail"
            autoCapitalize="none"
            onChangeText={(v) => {
              setEmail(v);
            }}
            value={email}
          ></TextInput>

          <TextInput
            style={shared.input}
            placeholder=" Enter Password"
            autoCapitalize="none"
            onChangeText={(v) => {
              setPassword(v);
            }}
            value={password}
            secureTextEntry={true}
          ></TextInput>
          <TextInput
            style={shared.input}
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
      </ImageBackground>
    </View>
  );
};

const styled = {
  loginText: {
    color: "#444444",
    fontWeight: "bold",
  },
};

export default CreateAccountScreen;
