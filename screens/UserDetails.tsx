import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import shared from "../styles/shared.styles";
import { matchInfo, matchInfoDetails } from "../services/zodiacInfo";
import { findUser } from "../services/usersService";
import { auth } from "../firebaseConfig";

const UserDetails = ({ route }) => {
  const navigation = useNavigation();
  const [loggedUser, setLoggedUser] = useState(null);
  const [overallMatch, setOverallMatch] = useState(0);
  const [description, setDescription] = useState("");
  const { user } = route.params;

  useEffect(() => {
    findUser(auth.currentUser?.uid as string).then((res) =>
      setLoggedUser(res as any)
    );

    if (loggedUser) {
      matchInfo(loggedUser, user).then((r) => setOverallMatch(r[0].overall));
      matchInfoDetails(loggedUser.zodiacSign, user.zodiacSign).then((r) =>
        setDescription(r[3].text)
      );
    }
  }, []);

  return (
    <SafeAreaView style={shared.screen}>
      <ImageBackground
        source={require("../assets/background-1.png")}
        resizeMethod="auto"
        style={{
          width: "100%",
          height: "100%",
          alignItems: "center",
        }}
      >
        <Image
          source={{ uri: user.url }}
          width={300}
          height={300}
          style={{ marginTop: 80, borderRadius: 10 }}
        />
        <Text style={[shared.text, { margin: 0 }]}>
          {user.name}, {user.age}
        </Text>
        <Text style={{ color: "white", fontSize: 20 }}>{user.zodiacSign}</Text>
        <Text style={{ color: "white" }}>{user.bio}</Text>
        <Text style={[shared.text, { fontSize: 24, marginTop: 10 }]}>
          How well do you match?
        </Text>
        {description ? (
          <Text style={{ color: "white", textAlign: "center" }}>
            {description}
          </Text>
        ) : (
          <ActivityIndicator />
        )}
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Text>Go back</Text>
        </TouchableOpacity>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default UserDetails;
