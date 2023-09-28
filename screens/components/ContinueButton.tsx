import { Pressable, Text } from "react-native";
import shared from "../../styles/shared.styles";
import { useNavigation } from "@react-navigation/native";
import { updateUser } from "../../services/usersService";
import { auth } from "../../firebaseConfig";

const ContinueButton = ({ navigateTo, updateBody }) => {
  const navigation = useNavigation();

  return (
    <Pressable
      style={shared.button}
      onPress={() => {
        if (navigation) {
          navigation.navigate(navigateTo);
        }
        if (updateBody) {
          updateUser(auth.currentUser?.uid, updateBody).then((r) => r);
        }
      }}
    >
      <Text style={shared.buttonText}>Continue</Text>
    </Pressable>
  );
};

export default ContinueButton;
