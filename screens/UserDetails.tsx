import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect } from "react";
import shared from "../styles/shared.styles";

const UserDetails = ({ user }) => {
  const navigation = useNavigation();
  const route = useRoute();
  const { matchDetails } = route.params;

  useEffect(() => {
    console.log(matchDetails);
  }, []);

  return (
    <SafeAreaView style={shared.screen}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Text>Go back</Text>
      </TouchableOpacity>
      <Image
        source={{ uri: matchDetails.url }}
        width={300}
        height={300}
        style={{ marginTop: 10, borderRadius: 10 }}
      />
      <Text style={[shared.text, { margin: 0 }]}>{matchDetails.name}</Text>
      <Text style={{ color: "white", fontSize: 20 }}>
        {matchDetails.zodiacSign}
      </Text>
      <Text style={{ color: "white" }}>{matchDetails.bio}</Text>
    </SafeAreaView>
  );
};

export default UserDetails;
