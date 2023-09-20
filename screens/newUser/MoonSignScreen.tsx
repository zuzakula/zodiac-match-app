import { SafeAreaView, Text } from "react-native";
import shared from "../../styles/shared.styles";
import Button from "../components/Button";

const MoonSignScreen = () => {
  return (
    <SafeAreaView style={shared.screen}>
      <Text style={shared.text}>MOON SIGN</Text>
      <Button navigateTo={"Rising"} />
    </SafeAreaView>
  );
};

export default MoonSignScreen;
