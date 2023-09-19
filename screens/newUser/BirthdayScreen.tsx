import { SafeAreaView, View, Text } from "react-native";
import { shared } from "../../styles/shared.styles";
import ContinueButton from "./components/ContinueButton";

const BirthdayScreen = () => {
  return (
    <SafeAreaView style={shared.screen}>
      <Text style={shared.text}>
        To be able to find out who you click with:
      </Text>
      <Text style={shared.text}> Input your birthday date!</Text>
      <ContinueButton navigateTo={"BigThree"} />
    </SafeAreaView>
  );
};

export default BirthdayScreen;