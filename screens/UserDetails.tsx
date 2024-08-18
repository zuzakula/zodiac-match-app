import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ImageBackground,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import shared from "../styles/shared.styles";
import { matchInfo, matchInfoDetails } from "../services/zodiacInfo";
import { findUser } from "../services/usersService";
import { auth } from "../firebaseConfig";
import { AntDesign } from "@expo/vector-icons";
import { getDistanceFromLatLonInKm } from "../services/location";

const UserDetails = ({ route }: any) => {
  const navigation = useNavigation();
  const [loggedUser, setLoggedUser] = useState(null);
  const [overallMatch, setOverallMatch] = useState(0);
  const [description, setDescription] = useState("");
  const { user } = route.params;
  const [loggedUserLat, setLoggedUserLat] = useState("");
  const [loggedUserLon, setLoggedUserLon] = useState("");
  const [userLat, setUserLat] = useState("");
  const [userLon, setUserLon] = useState("");
  const [distance, setDistance] = useState<number>(0);

  useEffect(() => {
    findUser(auth.currentUser?.uid as string).then((res) =>
      setLoggedUser(res as any)
    );

    if (loggedUser) {
      matchInfo(loggedUser, user).then((r) => setOverallMatch(r[0].overall));
      matchInfoDetails(loggedUser.zodiacSign, user.zodiacSign).then((r) => {
        console.log(r[0].text);
        setDescription(r[0].text);
      });

      if (loggedUser?.location) {
        setLoggedUserLat(loggedUser?.location?.latitude);
        setLoggedUserLon(loggedUser?.location?.longitude);
        setUserLat(user?.location.latitude);
        setUserLon(user?.location.longitude);

        setDistance(
          Math.trunc(
            getDistanceFromLatLonInKm(
              loggedUserLat,
              loggedUserLon,
              userLat,
              userLon
            )
          )
        );
      }
    }
  }, [distance, user, description]);

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
        <ScrollView
          style={{
            margin: 20,
            borderRadius: 20,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={{ marginTop: 30 }}
          >
            <AntDesign name="back" size={40} color="white" />
          </TouchableOpacity>
          <View style={{ alignItems: "center" }}>
            {user.url[0] && (
              <Image
                source={{ uri: user.url[0] }}
                width={300}
                height={300}
                style={{ marginTop: 40, borderRadius: 10 }}
              />
            )}
            {user.url[1] && (
              <Image
                source={{ uri: user.url[1] }}
                width={300}
                height={300}
                style={{ marginTop: 40, borderRadius: 10 }}
              />
            )}
            {user.url[2] && (
              <Image
                source={{ uri: user.url[2] }}
                width={300}
                height={300}
                style={{ marginTop: 40, borderRadius: 10 }}
              />
            )}
            {user.url[3] && (
              <Image
                source={{ uri: user.url[3] }}
                width={300}
                height={300}
                style={{ marginTop: 40, borderRadius: 10 }}
              />
            )}
          </View>
          <Text style={[shared.text, { margin: 15 }]}>
            {user.name}, {user.age}
          </Text>
          <Text
            style={{
              color: "white",
              fontSize: 20,
              marginBottom: 10,
              textAlign: "center",
            }}
          >
            {user.zodiacSign}
          </Text>
          <Text
            style={{
              color: "white",
              padding: 20,
              borderRadius: 20,
              textAlign: "center",
            }}
          >
            {user.bio}
          </Text>
          <Text style={[shared.text, { fontSize: 24, margin: 20 }]}>
            How well do you match?
          </Text>
          {description ? (
            <Text
              style={{
                color: "white",
                padding: 20,
                fontSize: 16,
              }}
            >
              {description}
            </Text>
          ) : (
            <ActivityIndicator />
          )}
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default UserDetails;
