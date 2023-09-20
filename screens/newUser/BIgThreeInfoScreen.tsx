import { SafeAreaView, Text } from "react-native";
import shared from "../../styles/shared.styles";
import Button from "../components/Button";

const BigThreeInfoScreen = () => {
  return (
    <SafeAreaView style={shared.screen}>
      <Text style={shared.text}>
        {" "}
        Here will be some info from external API based on the result from
        birthday date
      </Text>
      <Button navigateTo={"Sun"} />
    </SafeAreaView>
  );
};

export default BigThreeInfoScreen;
