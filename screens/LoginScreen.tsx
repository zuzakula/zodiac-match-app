import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  Pressable,
  ImageBackground,
  StyleProp,
  SafeAreaView,
} from "react-native";
import React, { useState } from "react";
import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import shared from "../styles/shared.styles";
import { findUser } from "../services/usersService";

interface LoginScreenProps {
  isEmailVerified: boolean | null;
}

const LoginScreen: React.FC<LoginScreenProps> = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState(null);
  const navigation = useNavigation();
  const firebaseAuth = auth;

  // @ts-ignore
  const signIn = async ({ isEmailVerified }) => {
    setLoading(true);
    try {
      console.log(auth.currentUser?.emailVerified, "?");
      const res = await signInWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );

      if (!auth.currentUser?.emailVerified) {
        alert("Sign in failed");

        setEmail("");
        setPassword("");
      } else {
        setUser((await findUser(auth.currentUser?.uid)) as any);
        console.log(user, auth.currentUser?.emailVerified);
        if (user?.initialSetupDone) {
          navigation.navigate("HomeScreen");
        } else {
          navigation.navigate("AddPictures");
        }
      }
    } catch (err: any) {
      alert("Sign in failed: " + err.message);
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
            onChangeText={(v) => {
              setEmail(v);
            }}
            value={email}
            autoFocus={true}
          ></TextInput>

          <TextInput
            style={shared.input}
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
            </>
          )}
        </View>
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
