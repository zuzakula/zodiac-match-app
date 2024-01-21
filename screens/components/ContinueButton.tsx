import { Pressable, Text, Alert } from "react-native";
import shared from "../../styles/shared.styles";
import { useNavigation, useRoute } from "@react-navigation/native";
import { updateUser } from "../../services/usersService";
import { auth } from "../../firebaseConfig";

const ContinueButton = ({
  navigateTo,
  updateBody,
  isDisabled,
}: {
  navigateTo: string;
  updateBody: any;
  isDisabled: boolean;
}) => {
  const navigation = useNavigation();
  const route = useRoute();

  const handlePress = async () => {
    if (isDisabled) {
      // Handle disabled state with alerts
      if (route.name === "AboutYou") {
        Alert.alert(
          "Bio is too long",
          "Your bio exceeds the maximum allowed length of 250 characters.",
          [{ text: "OK", style: "default" }]
        );
      } else if (route.name === "Birthday") {
        Alert.alert(
          "You are too young :(",
          "You must be at least 16 in order to finish setting up your account.",
          [{ text: "OK", style: "default" }]
        );
      }
      return;
    }

    try {
      // Update user data if required
      if (updateBody) {
        await updateUser(auth.currentUser?.uid as string, updateBody);
      }

      if (navigation && navigateTo) {
        setTimeout(() => {
          navigation.navigate(navigateTo as never);
        }, 100);
      }
    } catch (error) {
      console.error("Error updating user data:", error);
      Alert.alert(
        "Error",
        "There was an error updating your data. Please try again.",
        [{ text: "OK", style: "default" }]
      );
    }
  };

  return (
    <Pressable
      style={[
        shared.button,
        isDisabled && { opacity: 0.5 }, // Change button style when disabled
      ]}
      onPress={handlePress}
      disabled={isDisabled} // Disable press interaction when isDisabled is true
    >
      <Text style={shared.buttonText}>Continue</Text>
    </Pressable>
  );
};

export default ContinueButton;
