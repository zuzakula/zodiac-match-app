import { View, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

const WelcomeScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styled.welcomeScreen}>
      <View>
        <Text style={styled.welcomeText}>Welcome to Zodiac Match!</Text>
      </View>
      <View style={styled.signUp}>
        <Pressable
          onPress={() => {
            if (navigation) {
              navigation.navigate("CreateNewAcc");
            }
          }}
          style={styled.signUpButton}
        >
          <Text style={styled.signUpButton}>Sign up</Text>
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
  welcomeScreen: {
    position: "absolute",
    backgroundColor: "#6F78C7",
    height: "100%",
    width: "100%",
  },
  welcomeText: {
    color: "white",
    position: "relative",
    top: 80,
    margin: 20,
    fontWeight: "bold",
    fontSize: 38,
  },
  signUpButton: {
    backgroundColor: "#444444",
    borderRadius: 20,
    height: 45,
    width: "70%",
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    alignItems: "center",
    verticalAlign: "middle",
  },
  signUp: {
    position: "relative",
    top: 350,
    flex: 1,
    alignItems: "center",
  },
  loginText: {
    color: "#444444",
    fontWeight: "bold",
  },
};

export default WelcomeScreen;
