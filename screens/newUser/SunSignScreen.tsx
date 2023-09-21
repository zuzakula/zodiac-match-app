import { SafeAreaView, Text } from "react-native";
import shared from "../../styles/shared.styles";
import ContinueButton from "../components/ContinueButton";
import GoBackButton from "../components/GoBackButton";

const SunSignScreen = () => {
  return (
    <SafeAreaView style={shared.screen}>
      <Text style={shared.text}>SUN SIGN</Text>
      <ContinueButton navigateTo={"Moon"} />
      <GoBackButton goBackTo={"BigThree"} />
    </SafeAreaView>
  );
};

export default SunSignScreen;
