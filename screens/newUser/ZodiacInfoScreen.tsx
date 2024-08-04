import {
  ActivityIndicator,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  Text,
  View,
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
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await findUser(auth.currentUser?.uid as string);
        setZodiac(user?.zodiacSign);

        const zodiacInfo = await getZodiacInfo(user?.zodiacSign.toLowerCase());
        // console.log(user?.zodiacSign);
        setAboutZodiac(zodiacInfo.about);
        setCompatibility(zodiacInfo.compatibility);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();

    return () => {};
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
          <Text style={[shared.text, { color: "#7E00FC", marginTop: 50 }]}>
            Your Zodiac Sign is:
          </Text>
          <Text style={[shared.text, { marginTop: 0 }]}>{zodiac}</Text>
          <Text
            style={[
              shared.text,
              { marginTop: 30, fontSize: 23, color: "#7E00FC" },
            ]}
          >
            You are most compatible with:{" "}
          </Text>
          {compatibility ? (
            <Text style={[shared.text, { marginTop: 0, fontSize: 18 }]}>
              {compatibility}
            </Text>
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
          <View style={{ alignItems: "center", marginBottom: 20 }}>
            <ContinueButton
              navigateTo={"Location"}
              updateBody={{ initialSetupDone: true }}
            />
            <GoBackButton goBackTo={"Birthday"} />
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default ZodiacInfoScreen;
