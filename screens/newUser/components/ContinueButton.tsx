import { Pressable, Text } from "react-native";
import { shared } from "../../../styles/shared.styles";
import { useNavigation } from "@react-navigation/native";

const ContinueButton = ({ navigateTo }) => {
  const navigation = useNavigation();

  return (
    <Pressable
      style={shared.continueButton}
      onPress={() => {
        if (navigation) {
          navigation.navigate(navigateTo);
        }
      }}
    >
      <Text style={shared.continueButtonText}>Continue</Text>
    </Pressable>
  );
};

export default ContinueButton;
