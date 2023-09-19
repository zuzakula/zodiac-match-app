import { SafeAreaView, Text } from "react-native";
import { shared } from "../../styles/shared.styles";
import Button from "../components/Button";

const RisingSignScreen = () => {
  return (
    <SafeAreaView style={shared.screen}>
      <Text style={shared.text}>RISING SIGN</Text>
      <Button navigateTo={"Home"} />
    </SafeAreaView>
  );
};

export default RisingSignScreen;
