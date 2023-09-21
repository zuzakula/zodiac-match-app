import { SafeAreaView, Text } from "react-native";
import shared from "../../styles/shared.styles";
import ContinueButton from "../components/ContinueButton";
import GoBackButton from "../components/GoBackButton";

const MoonSignScreen = () => {
  return (
    <SafeAreaView style={shared.screen}>
      <Text style={shared.text}>MOON SIGN</Text>
      <ContinueButton navigateTo={"Rising"} />
      <GoBackButton goBackTo={"Sun"} />
    </SafeAreaView>
  );
};

export default MoonSignScreen;
