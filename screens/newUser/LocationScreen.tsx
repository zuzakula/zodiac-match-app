import {
  ActivityIndicator,
  ImageBackground,
  Modal,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Geolocation from "@react-native-community/geolocation";
import { useEffect, useState } from "react";
// import Permissions from "react-native-permissions";
import shared from "../../styles/shared.styles";
import ContinueButton from "../components/ContinueButton";
import GoBackButton from "../components/GoBackButton";
import { updateUser } from "../../services/usersService";
import { auth } from "../../firebaseConfig";

const PermissionModal = ({ isVisible, onRequestClose }: any) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onRequestClose}
      onBackButtonPress={onRequestClose}
    >
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>App needs location permission to proceed</Text>
        <TouchableOpacity
          onPress={() => {
            updateUser(auth.currentUser?.uid as string, {
              id: auth.currentUser?.uid as string,
              initialSetupDone: true,
            });
          }}
        >
          <Text>setup</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            onRequestClose();
          }}
        >
          <Text>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const LocationScreen = () => {
  const [locationPermissionStatus, setLocationPermissionStatus] = useState("");

  useEffect(() => {
    checkLocationPermission().then((r) => r);
  }, []);
  const checkLocationPermission = async () => {
    // const status = await Permissions.check("location" as any);
    const status = "denied";

    if (status === "denied") {
      // Display a message explaining why location is needed
      // and provide a button to request permission.
      return (
        <View>
          <Text>App needs location permission to proceed</Text>
          <TouchableOpacity>
            <Text>Grant Permission</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      // Location permission is already granted or pending.
      return (
        <View>
          <Text>Location access is granted or pending</Text>
        </View>
      );
    }
  };

  // const requestLocationPermission = async () => {
  //   const status = await Permissions.request("location" as any);
  // };

  return (
    <SafeAreaView style={shared.screen}>
      <ImageBackground
        source={require("../../assets/background-1.png")}
        resizeMethod="auto"
        style={{
          alignItems: "center",
          width: "100%",
          height: "100%",
        }}
      >
        {locationPermissionStatus !== "granted" && (
          <TouchableOpacity onPress={() => {}} style={{ marginTop: 100 }}>
            <Text>Grant Permission</Text>
          </TouchableOpacity>
        )}
        <View style={{ alignItems: "center", marginBottom: 20 }}>
          <ContinueButton
            updateBody={{ initialSetup: true }}
            navigateTo={"Home"}
          />
          <GoBackButton goBackTo={"ZodiacInfo"} />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default LocationScreen;
