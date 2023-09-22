import { Button, SafeAreaView, Text } from "react-native";
import shared from "../../styles/shared.styles";
import ContinueButton from "../components/ContinueButton";
import GoBackButton from "../components/GoBackButton";
import { useState } from "react";

const BirthdayScreen = () => {
  const [birthdayDate, setBirthdayDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  return (
    <SafeAreaView style={shared.screen}>
      <Text style={shared.text}>
        To be able to find out who you click with:
      </Text>
      <Text style={shared.text}> Input your birthday date!</Text>

      <ContinueButton navigateTo={"BigThree"} />
      <GoBackButton goBackTo={"AboutYou"} />
    </SafeAreaView>
  );
};

export default BirthdayScreen;
