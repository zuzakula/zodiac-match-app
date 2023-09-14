import { useEffect, useState } from "react";
import LoginScreen from "./screens/LoginScreen";
import * as WebBrowser from "expo-web-browser";
import { auth } from "./firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import ChatScreen from "./screens/ChatScreen";
import CreateAccountScreen from "./screens/CreateAccountScreen";
import AddPicturesScreen from "./screens/newUser/AddPicturesScreen";

WebBrowser.maybeCompleteAuthSession();

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState<any>(null);
  const [newUser, setNewUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user: any) => {
      setUser(user);
    });
  }, []);

  useEffect(() => {});

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {user ? (
          <>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerShown: false }}
            ></Stack.Screen>
            <Stack.Screen name="Chat" component={ChatScreen}></Stack.Screen>
            <Stack.Screen
              name="AddPictures"
              component={AddPicturesScreen}
              options={{ headerShown: false }}
            ></Stack.Screen>
          </>
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="CreateNewAcc"
              component={CreateAccountScreen}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
