import {
  FlatList,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  View,
  Text,
  StyleProp,
  Image,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import firebase from "firebase/compat";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { getCompatibility } from "../services/zodiacInfo";

export const zodiacData = [
  { id: 1, name: "aries", icon: require("../assets/icons/aries.png") },
  { id: 2, name: "taurus", icon: require("../assets/icons/taurus.png") },
  { id: 3, name: "gemini", icon: require("../assets/icons/gemini.png") },
  { id: 4, name: "cancer", icon: require("../assets/icons/cancer.png") },
  { id: 5, name: "leo", icon: require("../assets/icons/leo.png") },
  { id: 6, name: "virgo", icon: require("../assets/icons/virgo.png") },
  { id: 7, name: "libra", icon: require("../assets/icons/libra.png") },
  { id: 8, name: "scorpio", icon: require("../assets/icons/scorpio.png") },
  {
    id: 9,
    name: "sagittarius",
    icon: require("../assets/icons/sagittarius.png"),
  },
  { id: 10, name: "capricorn", icon: require("../assets/icons/capricorn.png") },
  { id: 11, name: "aquarius", icon: require("../assets/icons/aquarius.png") },
  { id: 12, name: "pisces", icon: require("../assets/icons/pisces.png") },
];

const ZodiacList = ({ route }) => {
  const navigation = useNavigation();
  const { zodiac } = route.params;
  const [compatibilities, setCompatibilities] = useState<any>("");

  useEffect(() => {
    getCompatibility(zodiac).then((res) => setCompatibilities(res));
  }, [zodiac]);

  const getMatchSatisfaction = (sign: string) => {
    const satisfactionLevel = compatibilities[sign] && compatibilities[sign][1];

    switch (satisfactionLevel) {
      case 5:
        return "Perfect! 😍";
      case 4:
        return "Good 😊";
      case 3:
        return "Fine 😐";
      case 2:
        return "Not great😕";
      case 1:
        return "Pretty bad... 😞";
      default:
        return "???";
    }
  };

  const getBackgroundColor = (satisfaction: number) => {
    if (satisfaction == 5) {
      return "#ff80c8";
    } else if (satisfaction == 4) {
      return "#ffc2cb";
    } else {
      return "white";
    }
  };

  return (
    <SafeAreaView>
      <ImageBackground
        source={require("../assets/background-1.png")}
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
        >
          <AntDesign name="back" size={40} color="white" />
        </TouchableOpacity>
        <FlatList
          data={zodiacData}
          renderItem={({ item }) => {
            const satisfactionLevel =
              compatibilities[item.name] && compatibilities[item.name][1];

            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("ZodiacCompatibility", {
                    zodiacLogged: zodiac,
                    zodiac: item.name,
                  })
                }
              >
                <View
                  style={[
                    styled.row,
                    { backgroundColor: getBackgroundColor(satisfactionLevel) },
                  ]}
                >
                  <Image
                    style={{
                      backgroundColor: "#6F78C7",
                      height: 50,
                      width: 50,
                      borderRadius: 10,
                      borderColor: "#6F78C7",
                      borderWidth: 2,
                    }}
                    source={item.icon}
                  />
                  <Text
                    style={{
                      marginLeft: 20,
                      textTransform: "capitalize",
                      fontSize: 20,
                      fontWeight: "bold",
                    }}
                  >
                    {item.name}
                  </Text>
                  {compatibilities[item.name] && (
                    <Text style={{ marginLeft: "auto", marginRight: 10 }}>
                      {getMatchSatisfaction(item.name)}
                    </Text>
                  )}
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </ImageBackground>
    </SafeAreaView>
  );
};

const styled: StyleProp<any> = {
  row: {
    width: 350,
    height: 70,
    backgroundColor: "white",
    borderRadius: 20,
    margin: 5,
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    padding: 10,
  },
};

export default ZodiacList;
