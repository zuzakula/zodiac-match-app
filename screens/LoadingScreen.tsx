import shared from "../styles/shared.styles";
import { ActivityIndicator, ImageBackground, Text, View } from "react-native";

const LoadingScreen = () => {
  return (
    <View style={shared.screen}>
      <ImageBackground
        source={require("../assets/background-3.png")}
        resizeMethod="auto"
        style={{
          width: "100%",
          height: "100%",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      </ImageBackground>
    </View>
  );
};

export default LoadingScreen;
