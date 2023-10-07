import { SafeAreaView, Text } from "react-native";
import shared from "../../styles/shared.styles";
import ContinueButton from "../components/ContinueButton";
import GoBackButton from "../components/GoBackButton";

const RisingSignScreen = () => {
  return (
    <SafeAreaView style={shared.screen}>
      <Text style={shared.text}>RISING SIGN</Text>
      <ContinueButton navigateTo={"Home"} updateBody={null} />
      <GoBackButton goBackTo={"Moon"} />
    </SafeAreaView>
  );
};

export default RisingSignScreen;
