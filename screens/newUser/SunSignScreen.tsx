import { SafeAreaView, Text } from "react-native";
import { shared } from "../../styles/shared.styles";
import Button from "../components/Button";

const SunSignScreen = () => {
  return (
    <SafeAreaView style={shared.screen}>
      <Text style={shared.text}>SUN SIGN</Text>
      <Button navigateTo={"Moon"} />
    </SafeAreaView>
  );
};

export default SunSignScreen;
