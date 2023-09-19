import { SafeAreaView, View, Text } from "react-native";
import { shared } from "../../styles/shared.styles";
import ContinueButton from "./components/ContinueButton";

const SunSignScreen = () => {
  return (
    <SafeAreaView style={shared.screen}>
      <Text style={shared.text}>SUN SIGN</Text>
      <ContinueButton navigateTo={"Moon"} />
    </SafeAreaView>
  );
};

export default SunSignScreen;
