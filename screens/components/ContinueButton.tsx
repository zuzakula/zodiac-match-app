import { Pressable, Text } from "react-native";
import shared from "../../styles/shared.styles";
import { useNavigation, useRoute } from "@react-navigation/native";
import { findUser, updateUser } from "../../services/usersService";
import { auth } from "../../firebaseConfig";
import { Alert } from "react-native";
import { useState } from "react";

const ContinueButton = ({
  navigateTo,
  updateBody,
  isDisabled,
}: {
  navigateTo: string;
  updateBody: any;
}) => {
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <Pressable
      style={shared.button}
      onPress={async () => {
        if (!isDisabled) {
          try {
            if (updateBody) {
              const result = await updateUser(
                auth.currentUser?.uid as string,
                updateBody
              );
            }
            if (navigation) {
              navigation.navigate(navigateTo as never);
            }
          } catch (error) {
            console.error("Error updating user data:", error);
          }
        } else {
          if (route.name === "AboutYou") {
            Alert.alert(
              "Bio is too long",
              "Your bio exceeds the maximum allowed length of 250 characters.",
              [{ text: "OK", style: "default" }]
            );
            return;
          } else if (route.name === "Birthday") {
            Alert.alert(
              "You are too young :(",
              "You must be at least 16 in order to finish setting up account.",
              [{ text: "OK", style: "default" }]
            );
            return;
          }
        }
      }}
    >
      <Text style={shared.buttonText}>Continue</Text>
    </Pressable>
  );
};

export default ContinueButton;
