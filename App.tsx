import { StyleSheet, Text, View } from "react-native";
import { createContext, useEffect, useState } from "react";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import { ANDROID_CLIENT_ID, IOS_CLIENT_ID } from "@env";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { auth } from "./firebaseConfig";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
} from "firebase/auth";

WebBrowser.maybeCompleteAuthSession();

export const AuthContext = createContext<any>({ user: null });

export default function App() {
  const [userInfo, setUserInfo] = useState();
  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: IOS_CLIENT_ID,
    androidClientId: ANDROID_CLIENT_ID,
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential).then((r) => console.log(r));
    }
  }, [response]);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user: any) => {
      user ? setUserInfo(user) : console.log("err");
    });
    return () => unsub();
  }, []);

  return (
    <View>
      {userInfo ? <HomeScreen /> : <LoginScreen promptAsync={promptAsync} />}
    </View>
  );
}
