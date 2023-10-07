import { Pressable, Text } from "react-native";
import shared from "../../styles/shared.styles";
import { useNavigation } from "@react-navigation/native";
import { updateUser } from "../../services/usersService";
import { auth } from "../../firebaseConfig";

const ContinueButton = ({
  navigateTo,
  updateBody,
}: {
  navigateTo: string;
  updateBody: any;
}) => {
  const navigation = useNavigation();

  return (
    <Pressable
      style={shared.button}
      onPress={() => {
        if (navigation) {
          navigation.navigate(navigateTo as never);
        }
        if (updateBody) {
          updateUser(auth.currentUser?.uid as string, updateBody).then(
            (r) => r
          );
        }
      }}
    >
      <Text style={shared.buttonText}>Continue</Text>
    </Pressable>
  );
};

export default ContinueButton;
