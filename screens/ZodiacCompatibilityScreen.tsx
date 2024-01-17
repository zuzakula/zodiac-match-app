import {
  Image,
  ImageBackground,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { getCompatibility } from "../services/zodiacInfo";
import shared from "../styles/shared.styles";
import { zodiacData } from "./ZodiacList";

const ZodiacCompatibilityScreen = ({ route }) => {
  const navigation = useNavigation();
  const { zodiac, zodiacLogged } = route.params;
  const [compatibility, setCompatibility] = useState("");
  const [loggedUserIcon, setLoggedUserIcon] = useState(null);
  const [icon, setIcon] = useState(null);

  useEffect(() => {
    getCompatibility(zodiacLogged).then((r) =>
      setCompatibility(r[`${zodiac}`])
    );

    getIcons(zodiacLogged.toLowerCase(), zodiac);
  }, []);

  const getIcons = (zodiacLogged: string) => {
    zodiacData.find((item) => {
      if (item.name === zodiacLogged) {
        setLoggedUserIcon(item.icon);
      } else if (item.name === zodiac) {
        setIcon(item.icon);
      }
    });
  };

  return (
    <SafeAreaView>
      <ImageBackground
        source={require("../assets/background-2.png")}
        resizeMethod="auto"
        style={{
          width: "100%",
          height: "100%",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{ margin: 30 }}
        >
          <AntDesign name="back" size={40} color="white" />
        </TouchableOpacity>
        <View style={{ flexDirection: "row" }}>
          <Image
            source={loggedUserIcon as any}
            style={{ width: 80, height: 80 }}
          />
          <Text style={[shared.text, { fontSize: 40 }]}>&</Text>
          <Image source={icon as any} style={{ width: 80, height: 80 }} />
        </View>
        <Text style={[shared.text, { fontSize: 20, margin: 15 }]}>
          {compatibility}
        </Text>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default ZodiacCompatibilityScreen;
