import { View, Text, Pressable, Image, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import shared from "../styles/shared.styles";
import React from "react";

const WelcomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={shared.screen}>
      <ImageBackground
        source={require("../assets/background-3.png")}
        resizeMethod="cover"
        style={{
          width: "100%",
          height: "100%",
          alignItems: "center",
        }}
      >
        <View>
          <Text style={shared.text}>Welcome to Zodiac Match!</Text>
        </View>
        <Image source={require("../assets/logo.png")} style={styled.logo} />
        <View style={[shared.container, { top: 100 }]}>
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
              Already have an account?{" "}
              <Text style={styled.loginText}>Login</Text>
            </Text>
          </Pressable>
        </View>
      </ImageBackground>
    </View>
  );
};

const styled = {
  loginText: {
    color: "#444444",
    fontWeight: "bold",
  },
  logo: { width: "55%", height: "30%", marginTop: 20 },
};

export default WelcomeScreen;
