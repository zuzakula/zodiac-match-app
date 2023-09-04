import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {useState} from "react";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";

export default function App() {
  const [userInfo, setUserInfo] = useState();

  return (
    <View>
      {userInfo ? <HomeScreen/> : <LoginScreen />}
    </View>
  );
}
