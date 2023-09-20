import { View, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import shared from "../styles/shared.styles";
import React from "react";

const WelcomeScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={shared.screen}>
      <View>
        <Text style={shared.text}>Welcome to Zodiac Match!</Text>
      </View>
      <View style={shared.container}>
        <Pressable
          onPress={() => {
            if (navigation) {
              navigation.navigate("CreateNewAcc");
            }
          }}
          style={shared.button}
        >
          <Text style={shared.buttonText}>Sign up</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            if (navigation) {
              navigation.navigate("Login");
            }
          }}
        >
          <Text style={{ color: "white" }}>
            Already have an account? <Text style={styled.loginText}>Login</Text>
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styled = {
  loginText: {
    color: "#444444",
    fontWeight: "bold",
  },
};

export default WelcomeScreen;
