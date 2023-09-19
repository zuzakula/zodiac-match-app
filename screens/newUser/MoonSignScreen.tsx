import { SafeAreaView, View, Text } from "react-native";
import { shared } from "../../styles/shared.styles";
import ContinueButton from "./components/ContinueButton";

const MoonSignScreen = () => {
  return (
    <SafeAreaView style={shared.screen}>
      <Text style={shared.text}>MOON SIGN</Text>
      <ContinueButton navigateTo={"Rising"} />
    </SafeAreaView>
  );
};

export default MoonSignScreen;
