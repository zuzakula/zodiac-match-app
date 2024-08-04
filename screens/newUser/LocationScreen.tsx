import {
  ImageBackground,
  View,
  Text,
  PermissionsAndroid,
  TouchableOpacity,
} from "react-native";
import ContinueButton from "../components/ContinueButton";
import GoBackButton from "../components/GoBackButton";
import React, { useEffect, useState } from "react";
import { auth } from "../../firebaseConfig";
import shared from "../../styles/shared.styles";
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
} from "expo-location";

const LocationScreen = () => {
  const user = auth.currentUser;
  const [location, setLocation] = useState(null);
  const [hasLocationPermission, setHasLocationPermission] = useState(false);

  const requestLocationPermission = async () => {
    try {
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
        setHasLocationPermission(true);
        console.log("Location permission granted");
        await getLocation();
      } else {
        console.log("Location permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const getLocation = async () => {
    try {
      const location = await getCurrentPositionAsync({});
      setLocation(location.coords);
    } catch (error) {
      console.log("Error getting location:", error);
    }
  };

  useEffect(() => {
    requestLocationPermission().then((r) => r); // Initial request for location permission
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("../../assets/background-2.png")}
        resizeMethod="auto"
        style={{
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={{ margin: 20, alignItems: "center" }}>
          <Text style={shared.text}>Location</Text>
          <TouchableOpacity onPress={requestLocationPermission}>
            <Text style={[shared.text, { color: "#5e00ff", marginTop: 10 }]}>
              Click here to grant Permission
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginBottom: 20 }}>
          <ContinueButton
            navigateTo={"Home"}
            updateBody={{ location: location, initialSetupDone: true }}
            isDisabled={!location}
          />
        </View>
        <View style={{ marginBottom: 20 }}>
          <GoBackButton goBackTo={"AddPictures"} />
        </View>
      </ImageBackground>
    </View>
  );
};

export default LocationScreen;
