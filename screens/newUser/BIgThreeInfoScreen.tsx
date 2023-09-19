import { SafeAreaView, View, Text } from "react-native";
import { shared } from "../../styles/shared.styles";
import ContinueButton from "./components/ContinueButton";

const BigThreeInfoScreen = () => {
  return (
    <SafeAreaView style={shared.screen}>
      <Text style={shared.text}>
        {" "}
        Here will be some info from external API based on the result from
        birthday date
      </Text>
      <ContinueButton navigateTo={"Sun"} />
    </SafeAreaView>
  );
};

export default BigThreeInfoScreen;
