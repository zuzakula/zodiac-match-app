import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  Image,
  View,
  StyleProp,
  ImageBackground,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import shared from "../styles/shared.styles";
import React from "react";

const MatchScreen = () => {
  const navigation = useNavigation();
  const { params }: any = useRoute();
  const { loggedInUser, userSwiped } = params;

  return (
    <SafeAreaView
      style={[shared.screen, { backgroundColor: "rgba(111, 120, 199, 0.8)" }]}
    >
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
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(255, 128, 200, 0.6)",
          }}
        />
        <TouchableOpacity
          style={styled.closeButton}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Text style={shared.buttonText}>Close</Text>
        </TouchableOpacity>
        <Text style={[shared.text, { marginTop: 100 }]}>It's a match!</Text>
        <Text style={[shared.text, { marginLeft: 30, marginRight: 30 }]}>
          You and {userSwiped.name} liked each other
        </Text>

        {loggedInUser && userSwiped && (
          <View style={styled.matchPhotos}>
            <Image
              source={{ uri: loggedInUser.url }}
              width={130}
              height={130}
              style={styled.photo}
            />

            <Image
              source={{ uri: userSwiped.url[0] }}
              width={130}
              height={130}
              style={styled.photo}
            />
          </View>
        )}

        <TouchableOpacity
          style={shared.button}
          onPress={() => {
            navigation.navigate("Chat" as never);
          }}
        >
          <Text style={shared.buttonText}>Send a Message</Text>
        </TouchableOpacity>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styled: StyleProp<any> = {
  matchScreen: {
    height: "100%",
    opacity: 0.4,
  },
  matchPhotos: {
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
  },
  photo: {
    margin: 30,
    borderRadius: 80,
  },
  andText: {
    fontSize: 40,
    color: "black",
    marginHorizontal: 20,
    textAlign: "center",
  },
  message: {
    backgroundColor: "white",
    borderRadius: 20,
  },
  closeButton: {
    position: "absolute",
    top: 30,
    right: 20,
    backgroundColor: "#6F78C7",
    borderRadius: 15,
    padding: 20,
    paddingTop: 0,
    zIndex: 1,
  },
};

export default MatchScreen;
