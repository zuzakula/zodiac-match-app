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
      <Text style={shared.text}>It's a match!</Text>
      <Text style={shared.text}>
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
        <Text style={shared.buttonText}>Send Message</Text>
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
};

export default MatchScreen;
