import { SafeAreaView, Text } from "react-native";
import shared from "../../styles/shared.styles";
import ContinueButton from "../components/ContinueButton";
import GoBackButton from "../components/GoBackButton";

const BigThreeInfoScreen = () => {
  return (
    <SafeAreaView style={shared.screen}>
      <Text style={shared.text}>
        {" "}
        Here will be some info from external API based on the result from
        birthday date
      </Text>
      <ContinueButton navigateTo={"Sun"} />
      <GoBackButton goBackTo={"Birthday"} />
    </SafeAreaView>
  );
};

export default BigThreeInfoScreen;
