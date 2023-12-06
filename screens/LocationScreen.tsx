import React, { useEffect } from "react";
import { View, Text, Button } from "react-native";
import { check, request, PERMISSIONS, RESULTS } from "react-native-permissions";

const LocationPermissionExample = () => {
  useEffect(() => {
    checkLocationPermission().then((r) => r);
  }, []);

  const checkLocationPermission = async () => {
    try {
      const result = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);

      switch (result) {
        case RESULTS.UNAVAILABLE:
          console.log(
            "This feature is not available (on this device / in this context)"
          );
          break;
        case RESULTS.DENIED:
          console.log("Permission denied");
          requestLocationPermission();
          break;
        case RESULTS.GRANTED:
          console.log("Permission granted");
          break;
        case RESULTS.BLOCKED:
          console.log("Permission blocked by user. Open settings to enable.");
          break;
      }
    } catch (error) {
      console.error("Error checking location permission:", error);
    }
  };

  const requestLocationPermission = async () => {
    try {
      const result = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);

      if (result === RESULTS.GRANTED) {
        console.log("Permission granted");
      } else {
        console.log("Permission denied");
      }
    } catch (error) {
      console.error("Error requesting location permission:", error);
    }
  };

  return (
    <View>
      <Text>Location Permission Example</Text>
      <Button
        title="Check Location Permission"
        onPress={checkLocationPermission}
      />
    </View>
  );
};

export default LocationPermissionExample;
