import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  Image,
  View,
  StyleProp,
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
      style={[shared.screen, { backgroundColor: "rgb(111, 120, 199, .8)" }]}
    >
      <TouchableOpacity
        style={styled.closeButton}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Text style={shared.buttonText}>Close</Text>
      </TouchableOpacity>
      <Text style={[shared.text, { marginTop: 100, color: "black" }]}>
        It's a match!
      </Text>
      <Text style={[shared.text, { color: "black" }]}>
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
            source={{ uri: userSwiped.url }}
            width={130}
            height={130}
            style={styled.photo}
          />
        </View>
      )}
      <TouchableOpacity
        style={shared.button}
        onPress={() => {
          // navigation.goBack();
          navigation.navigate("Chat" as never);
        }}
      >
        <Text style={shared.buttonText}>Send a Message</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styled: StyleProp<any> = {
  matchScreen: {
    backgroundColor: "red",
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
  message: {
    backgroundColor: "white",
    borderRadius: 20,
  },
  closeButton: {
    position: "absolute",
    top: 30,
    right: 20,
    backgroundColor: "#ff6347",
    borderRadius: 15,
    padding: 20,
    paddingTop: 0,
    zIndex: 1,
  },
};

export default MatchScreen;
