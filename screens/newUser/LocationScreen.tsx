import {
  ImageBackground,
  View,
  Text,
  PermissionsAndroid,
  TouchableOpacity,
} from "react-native";
import ContinueButton from "../components/ContinueButton";
import GoBackButton from "../components/GoBackButton";
import React, { SetStateAction, useEffect, useState } from "react";
import { auth, db } from "../../firebaseConfig";
import shared from "../../styles/shared.styles";

const LocationScreen = () => {
  const user = auth.currentUser;
  const [location, setLocation] = useState(null);
  const [hasLocationPermission, setHasLocationPermission] = useState(false);

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
        setHasLocationPermission(true);
        console.log("Location permission granted");
        getLocation();
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

  return (
    <View>
      <ImageBackground
        source={require("../../assets/background-2.png")}
        resizeMethod="auto"
        style={{
          width: "100%",
          height: "100%",
          alignItems: "center",
        }}
      >
        <View>
          <Text style={shared.text}>No matches yet :(</Text>
          <TouchableOpacity onPress={requestLocationPermission}>
            <Text style={shared.text}>Permission</Text>
          </TouchableOpacity>
        </View>
        <ContinueButton navigateTo={"Home"} updateBody={{}} isDisabled={true} />
        <GoBackButton goBackTo={"AddPictures"} />
      </ImageBackground>
    </View>
  );
};

export default LocationScreen;
