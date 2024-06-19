import {
  FlatList,
  ImageBackground,
  PermissionsAndroid,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "./components/Header";
import shared from "../styles/shared.styles";
import ChatRow from "./components/ChatRow";
import { SetStateAction, useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig";
import { collection, onSnapshot, query, where } from "firebase/firestore";

const requestCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: "Cool Photo App Camera Permission",
        message:
          "Cool Photo App needs access to your camera " +
          "so you can take awesome pictures.",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK",
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can use the camera");
    } else {
      console.log("Camera permission denied");
    }
  } catch (err) {
    console.warn(err);
  }
};

const ChatScreen = () => {
  const [matches, setMatches] = useState([]);
  const user = auth.currentUser;
  const [location, setLocation] = useState(null);
  const requestLocationPermission = async () => {
    try {
      console.log("clicked");
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Location Permission",
          message: "App needs access to your location.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Location permission granted");
      } else {
        console.log("Location permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const getLocation = () => {
    Geolocation.getCurrentPosition(
      (position: { coords: SetStateAction<null> }) => {
        setLocation(position.coords);
      },
      (error: { code: any; message: any }) => {
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  useEffect(() => {
    requestLocationPermission().then((r) => r);
  }, []);

  useEffect(() => {
    onSnapshot(
      query(
        collection(db, "Matches") as any,
        where("usersMatched", "array-contains", auth.currentUser?.uid) as any
      ),
      (snapshot: any) =>
        setMatches(
          snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }))
        )
    );
  }, [user]);

  return (
    <SafeAreaView style={shared.screen}>
      <ImageBackground
        source={require("../assets/background-4.png")}
        resizeMethod="auto"
        style={{
          width: "100%",
          height: "100%",
          alignItems: "center",
        }}
      >
        <Header />
        <View style={{ marginTop: 30 }}>
          {matches.length > 0 ? (
            <FlatList
              data={matches}
              renderItem={({ item }) => {
                return <ChatRow matchDetails={item} />;
              }}
            />
          ) : (
            <View>
              <Text style={shared.text}>No matches yet :(</Text>
              <TouchableOpacity onPress={requestLocationPermission}>
                <Text style={shared.text}>Permission</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default ChatScreen;
