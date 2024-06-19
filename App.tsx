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
LogBox.ignoreLogs(["Warning: ..."]);
LogBox.ignoreAllLogs();

WebBrowser.maybeCompleteAuthSession();

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState<any>(null);
  const [initialSetup, setInitialSetup] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user: any) => {
      setUser(user);
      findUser(auth.currentUser?.uid as any).then((user) => {
        setInitialSetup(user?.initialSetup);
        console.log(user);
      });
    });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        {user && user.emailVerified ? (
          <>
            {initialSetup ? (
              <Stack.Group>
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
              </Stack.Group>
            ) : (
              <Stack.Group>
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
                ></Stack.Screen>
              </Stack.Group>
            )}
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
