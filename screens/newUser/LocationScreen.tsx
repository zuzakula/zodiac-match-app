import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  View,
  Text,
  TouchableOpacity,
  PermissionsAndroid,
} from "react-native";
import ContinueButton from "../components/ContinueButton";
import GoBackButton from "../components/GoBackButton";
import shared from "../../styles/shared.styles";
import { getCurrentPositionAsync } from "expo-location";
import * as TaskManager from "expo-task-manager";
import * as Location from "expo-location";

const LOCATION_TASK_NAME = "background-location-task";

TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
  if (error) {
    console.error("Location task error:", error);
    return;
  }
  if (data) {
    const { locations } = data;
    console.log("Received new locations:", locations);
  }
});

const LocationScreen = () => {
  const [location, setLocation] = useState<any>(null);
  const [hasLocationPermission, setHasLocationPermission] = useState(false);

  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        const { status: bgStatus } =
          await Location.requestBackgroundPermissionsAsync();
        if (bgStatus === "granted") {
          setHasLocationPermission(true);
          await startLocationUpdates();
          console.log("Background location permission granted");
          const currentLocation = await Location.getCurrentPositionAsync({});
          setLocation(currentLocation);
          console.log(currentLocation);
        } else {
          console.log("Background location permission denied");
        }
      } else {
        console.log("Foreground location permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const startLocationUpdates = async () => {
    try {
      await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
        accuracy: Location.Accuracy.High,
        timeInterval: 10000,
        distanceInterval: 50,
        foregroundService: {
          notificationTitle: "Location Tracking",
          notificationBody: "We are tracking your location",
        },
      });
    } catch (error) {
      console.log("Error starting location updates:", error);
    }
  };

  useEffect(() => {
    requestLocationPermission().then((r) => r);
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
          {/*<TouchableOpacity onPress={requestLocationPermission}>*/}
          {/*  <Text style={[shared.text, { color: "#5e00ff", marginTop: 10 }]}>*/}
          {/*    Click here to grant Permission*/}
          {/*  </Text>*/}
          {/*</TouchableOpacity>*/}
        </View>
        <View style={{ marginBottom: 20 }}>
          <ContinueButton
            navigateTo="Home"
            updateBody={{ location: location, initialSetupDone: true }}
            isDisabled={false}
          />
        </View>
        <View style={{ marginBottom: 20 }}>
          <GoBackButton goBackTo="AddPictures" />
        </View>
      </ImageBackground>
    </View>
  );
};

export default LocationScreen;
