import { SafeAreaView, View, Text } from "react-native";
import { shared } from "../../styles/shared.styles";
import ContinueButton from "./components/ContinueButton";

const RisingSignScreen = () => {
  return (
    <SafeAreaView style={shared.screen}>
      <Text style={shared.text}>RISING SIGN</Text>
      <ContinueButton navigateTo={"Home"} />
    </SafeAreaView>
  );
};

export default RisingSignScreen;
