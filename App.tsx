import { useEffect, useState } from "react";
import LoginScreen from "./screens/LoginScreen";
import * as WebBrowser from "expo-web-browser";
import { auth } from "./firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import ChatScreen from "./screens/ChatScreen";
import CreateAccountScreen from "./screens/CreateAccountScreen";
import AddPicturesScreen from "./screens/newUser/AddPicturesScreen";
import WelcomeScreen from "./screens/WelcomeScreen.";
import AboutYouScreen from "./screens/newUser/AboutYouScreen";
import BirthdayScreen from "./screens/newUser/BirthdayScreen";
import BigThreeInfoScreen from "./screens/newUser/BIgThreeInfoScreen";
import SunSignScreen from "./screens/newUser/SunSignScreen";
import MoonSignScreen from "./screens/newUser/MoonSignScreen";
import RisingSignScreen from "./screens/newUser/RisingSignScreen";

WebBrowser.maybeCompleteAuthSession();

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user: any) => {
      setUser(user);
    });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
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
            <Stack.Screen
              name="AboutYou"
              component={AboutYouScreen}
              options={{ headerShown: false }}
            ></Stack.Screen>
            <Stack.Screen
              name="Birthday"
              component={BirthdayScreen}
              options={{ headerShown: false }}
            ></Stack.Screen>
            <Stack.Screen
              name="BigThree"
              component={BigThreeInfoScreen}
              options={{ headerShown: false }}
            ></Stack.Screen>
            <Stack.Screen
              name="Sun"
              component={SunSignScreen}
              options={{ headerShown: false }}
            ></Stack.Screen>
            <Stack.Screen
              name="Moon"
              component={MoonSignScreen}
              options={{ headerShown: false }}
            ></Stack.Screen>
            <Stack.Screen
              name="Rising"
              component={RisingSignScreen}
              options={{ headerShown: false }}
            ></Stack.Screen>
          </>
        ) : (
          <>
            <Stack.Screen
              name="Welcome"
              component={WelcomeScreen}
              options={{ headerShown: false }}
            />
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
