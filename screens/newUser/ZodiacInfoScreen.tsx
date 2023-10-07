import { SafeAreaView, Text } from "react-native";
import shared from "../../styles/shared.styles";
import ContinueButton from "../components/ContinueButton";
import GoBackButton from "../components/GoBackButton";
import { useEffect, useState } from "react";
import { findUser } from "../../services/usersService";
import { auth } from "../../firebaseConfig";
import { getZodiacInfo } from "../../services/zodiacInfo";

const ZodiacInfoScreen = () => {
  const [date, setDate] = useState<string>("");
  const [zodiac, setZodiac] = useState<string>("");

  useEffect(() => {
    findUser(auth.currentUser?.uid as string).then((res) =>
      setZodiac(res.zodiacSign)
    );
    getZodiacInfo(zodiac.toLowerCase()).then((res) => console.log(res.name));
  }, []);

  return (
    <SafeAreaView style={shared.screen}>
      <Text style={shared.text}>Your Zodiac Sign is: {zodiac}</Text>
      <ContinueButton navigateTo={"Home"} updateBody={null} />
      <GoBackButton goBackTo={"Birthday"} />
    </SafeAreaView>
  );
};

export default ZodiacInfoScreen;
