import { createContext, useEffect, useState } from "react";
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
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import firebase from "firebase/compat";
import User = firebase.User;

WebBrowser.maybeCompleteAuthSession();

export const AuthContext = createContext<any>({ user: null });

const Stack = createNativeStackNavigator();

const InsideStack = createNativeStackNavigator();

const InsideLayout = () => {
  return (
    <InsideStack.Navigator>
      <InsideStack.Screen name="Home screen" component={HomeScreen} />
    </InsideStack.Navigator>
  );
};

export default function App() {
  const [user, setUser] = useState<any>(null);
  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: IOS_CLIENT_ID,
    androidClientId: ANDROID_CLIENT_ID,
  });

  // useEffect(() => {
  //   if (response?.type === "success") {
  //     const { id_token } = response.params;
  //     const credential = GoogleAuthProvider.credential(id_token);
  //     signInWithCredential(auth, credential).then((r) => console.log(r));
  //   }
  // }, [response]);
  //
  // useEffect(() => {
  //   const unsub = onAuthStateChanged(auth, async (user: any) => {
  //     user ? setUser(user) : console.log("err");
  //   });
  //   return () => unsub();
  // }, []);

  useEffect(() => {
    onAuthStateChanged(auth, (user: any) => {
      if (user) {
        setUser(user);
      }
    });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {user ? (
          <Stack.Screen
            name="Inside"
            component={InsideLayout}
            options={{ headerShown: false }}
          ></Stack.Screen>
        ) : (
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            // options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
