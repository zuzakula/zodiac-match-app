import {
  ActivityIndicator,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  Text,
} from "react-native";
import shared from "../../styles/shared.styles";
import ContinueButton from "../components/ContinueButton";
import GoBackButton from "../components/GoBackButton";
import { useEffect, useState } from "react";
import { findUser } from "../../services/usersService";
import { auth } from "../../firebaseConfig";
import { getZodiacInfo } from "../../services/zodiacInfo";

const ZodiacInfoScreen = () => {
  const [zodiac, setZodiac] = useState<string>("");
  const [aboutZodiac, setAboutZodiac] = useState<string>("");
  const [compatibility, setCompatibility] = useState<string>("");

  useEffect(() => {
    findUser(auth.currentUser?.uid as string).then((res) =>
      setZodiac(res.zodiacSign)
    );
    getZodiacInfo(zodiac.toLowerCase()).then((res) => {
      setAboutZodiac(res.about);
      setCompatibility(res.compatibility);
    });
  }, []);

  return (
    <SafeAreaView style={shared.screen}>
      <ImageBackground
        source={require("../../assets/background-1.png")}
        resizeMethod="auto"
        style={{
          alignItems: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <ScrollView>
          <Text style={[shared.text, { color: "#7E00FC" }]}>
            Your Zodiac Sign is:
          </Text>
          <Text style={[shared.text, { marginTop: 0 }]}>{zodiac}</Text>
          <Text
            style={[
              shared.text,
              { marginTop: 0, fontSize: 23, color: "#7E00FC" },
            ]}
          >
            You are most compatible with:{" "}
          </Text>
          {compatibility ? (
            <Text style={[shared.text, { marginTop: 0 }]}>{compatibility}</Text>
          ) : (
            <ActivityIndicator />
          )}
          {aboutZodiac ? (
            <Text
              style={{
                color: "white",
                margin: 20,
                textAlign: "justify",
                fontSize: 20,
              }}
            >
              {aboutZodiac}
            </Text>
          ) : (
            <ActivityIndicator />
          )}
          <ContinueButton navigateTo={"Home"} updateBody={null} />
          <GoBackButton goBackTo={"Birthday"} />
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default ZodiacInfoScreen;
