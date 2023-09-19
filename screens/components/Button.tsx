import { Pressable, Text } from "react-native";
import { shared } from "../../styles/shared.styles";
import { useNavigation } from "@react-navigation/native";

const Button = ({ navigateTo }) => {
  const navigation = useNavigation();

  return (
    <Pressable
      style={shared.button}
      onPress={() => {
        if (navigation) {
          navigation.navigate(navigateTo);
        }
      }}
    >
      <Text style={shared.buttonText}>Continue</Text>
    </Pressable>
  );
};

export default Button;
