import { SetStateAction, useEffect, useReducer, useState } from "react";
import LoginScreen from "./screens/LoginScreen";
import * as WebBrowser from "expo-web-browser";
import { auth, storage } from "./firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import ChatScreen from "./screens/ChatScreen";
import CreateAccountScreen from "./screens/CreateAccountScreen";
import AddPicturesScreen from "./screens/newUser/AddPicturesScreen";
import WelcomeScreen from "./screens/WelcomeScreen.";
import AboutYouScreen from "./screens/newUser/AboutYouScreen";
import BirthdayScreen from "./screens/newUser/BirthdayScreen";
import ZodiacInfoScreen from "./screens/newUser/ZodiacInfoScreen";
import { LogBox } from "react-native";
import MatchScreen from "./screens/MatchScreen";
import MessageScreen from "./screens/MessageScreen";
import UserDetails from "./screens/UserDetails";
import SettingsScreen from "./screens/SettingsScreen";
import LocationScreen from "./screens/newUser/LocationScreen";
import ZodiacList from "./screens/ZodiacList";
import { findUser } from "./services/usersService";
import ZodiacCompatibilityScreen from "./screens/ZodiacCompatibilityScreen";
import EditProfileScreen from "./screens/EditProfileScreen";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import ChangePhotos from "./screens/ChangePhotos";
import LoadingScreen from "./screens/LoadingScreen";
LogBox.ignoreLogs(["Warning: ..."]);
LogBox.ignoreAllLogs();

WebBrowser.maybeCompleteAuthSession();

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState<any>(null);
  const [initialSetup, setInitialSetup] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user: any) => {
      setUser(user);
      if (user) {
        const userData = await findUser(user.uid);
        setInitialSetup(userData?.initialSetupDone || false);
      } else {
        setInitialSetup(false);
      }
    });
    return () => unsubscribe();
  }, [user]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        {user ? (
          <>
            <Stack.Screen
              name="Loading"
              component={LoadingScreen}
              options={{ headerShown: false }}
            ></Stack.Screen>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerShown: false }}
            ></Stack.Screen>
            <Stack.Screen
              name="UserDetails"
              component={UserDetails}
              options={{ headerShown: false }}
            ></Stack.Screen>
            <Stack.Screen
              name="Chat"
              component={ChatScreen}
              options={{ headerShown: false }}
            ></Stack.Screen>
            <Stack.Screen
              name="Match"
              component={MatchScreen}
              options={{ headerShown: false }}
            ></Stack.Screen>
            <Stack.Screen
              name="Message"
              component={MessageScreen}
              options={{ headerShown: false }}
            ></Stack.Screen>
            <Stack.Screen
              name="Settings"
              component={SettingsScreen}
              options={{ headerShown: false }}
            ></Stack.Screen>
            <Stack.Screen
              name="ZodiacList"
              component={ZodiacList}
              options={{ headerShown: false }}
            ></Stack.Screen>
            <Stack.Screen
              name="ZodiacCompatibility"
              component={ZodiacCompatibilityScreen}
              options={{ headerShown: false }}
            ></Stack.Screen>
            <Stack.Screen
              name="EditProfile"
              component={EditProfileScreen}
              options={{ headerShown: false }}
            ></Stack.Screen>
            <Stack.Screen
              name="ChangePhotos"
              component={ChangePhotos}
              options={{ headerShown: false }}
            ></Stack.Screen>
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
              name="ZodiacInfo"
              component={ZodiacInfoScreen}
              options={{ headerShown: false }}
            ></Stack.Screen>
            <Stack.Screen
              name="Location"
              component={LocationScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Login" options={{ headerShown: false }}>
              {() => <LoginScreen isEmailVerified={user?.emailVerified} />}
            </Stack.Screen>
          </>
        ) : (
          <>
            <Stack.Screen
              name="Welcome"
              component={WelcomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Login" options={{ headerShown: false }}>
              {() => <LoginScreen isEmailVerified={user?.emailVerified} />}
            </Stack.Screen>
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
