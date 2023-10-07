import { Text, TouchableOpacity } from "react-native";
import shared from "../../styles/shared.styles";
import { useNavigation } from "@react-navigation/native";

const GoBackButton = ({ goBackTo }: { goBackTo: string }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        if (navigation) {
          navigation.navigate(goBackTo as never);
        }
      }}
    >
      <Text style={shared.buttonText}>Go back</Text>
    </TouchableOpacity>
  );
};

export default GoBackButton;
