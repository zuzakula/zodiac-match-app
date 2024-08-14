import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  Pressable,
  ImageBackground,
  StyleProp,
} from "react-native";
import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import shared from "../styles/shared.styles";
import { findUser } from "../services/usersService";
import CustomAlert from "./components/Alert";

interface LoginScreenProps {
  isEmailVerified: boolean | null;
}

const LoginScreen: React.FC<LoginScreenProps> = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState(null);
  const [alertVisible, setAlertVisible] = useState(false); // State for managing alert visibility
  const [alertMessage, setAlertMessage] = useState(""); // State for storing alert message
  const [alertTitle, setAlertTitle] = useState(""); // State for storing alert title
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

      const userRes = await findUser(auth.currentUser?.uid as string);
      setUser(userRes);

      if (userRes?.emailVerified) {
        if (userRes?.initialSetupDone) {
          navigation.navigate("Home" as never);
          setEmail("");
          setPassword("");
        } else {
          navigation.navigate("AddPictures" as never);
          setEmail("");
          setPassword("");
        }
      } else if (!userRes?.emailVerified) {
        setAlertTitle("Email Verification Required");
        setAlertMessage("Your email hasn't been verified yet.");
        setAlertVisible(true);
      }
    } catch (err: any) {
      setAlertTitle("Sign In Failed");
      setAlertMessage("Sign in failed: " + err.message);
      setAlertVisible(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={shared.screen}>
      <ImageBackground
        source={require("../assets/background-3.png")}
        resizeMethod="auto"
        style={{
          width: "100%",
          height: "100%",
          alignItems: "center",
        }}
      >
        <Text style={[shared.text, { marginTop: 70 }]}>
          Login to Zodiac Match!
        </Text>

        <View style={{ marginTop: 100 }}>
          <TextInput
            style={shared.input}
            placeholder=" Enter your e-mail"
            autoCapitalize="none"
            onChangeText={setEmail}
            value={email}
            autoFocus={true}
          />

          <TextInput
            style={shared.input}
            placeholder=" Enter your password"
            autoCapitalize="none"
            onChangeText={setPassword}
            value={password}
            secureTextEntry={true}
          />

          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <View style={shared.container}>
              <Pressable style={shared.button} onPress={signIn}>
                <Text style={shared.buttonText}>Login</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  if (navigation) {
                    navigation.navigate("CreateNewAcc" as never);
                  }
                }}
              >
                <Text style={{ color: "white" }}>
                  Don't have an account yet?
                  <Text style={styled.createNewAccText}> Sign up </Text>
                </Text>
              </Pressable>
            </View>
          )}
        </View>

        <CustomAlert
          visible={alertVisible}
          title={alertTitle}
          message={alertMessage}
          onClose={() => setAlertVisible(false)}
        />
      </ImageBackground>
    </View>
  );
};

const styled: StyleProp<any> = {
  createNewAccText: {
    color: "#444444",
    fontWeight: "bold",
  },
};

export default LoginScreen;
