import { Image, TouchableOpacity, View, Text, StyleProp } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../../firebaseConfig";
import { useEffect, useState } from "react";
import { getMatchedUserInfo } from "../../lib/getMatchedUserInfo";

const ChatRow = ({ matchDetails }: { matchDetails: any }) => {
  const navigation = useNavigation();
  const user = auth.currentUser;
  const [matchUserInfo, setMatchUserInfo] = useState<any>(null);

  useEffect(() => {
    setMatchUserInfo(getMatchedUserInfo(matchDetails.users, user?.uid) as any);
  }, []);

  return (
    matchUserInfo && (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Message" as never, { matchDetails } as never)
        }
      >
        <View style={styled.match}>
          <Image
            style={styled.matchPic}
            source={{
              uri: "https://picsum.photos/id/237/200/300",
            }}
            width={60}
            height={60}
          />

          <Text style={styled.name}> {matchUserInfo.name} </Text>
        </View>
      </TouchableOpacity>
    )
  );
};

const styled: StyleProp<any> = {
  match: {
    width: 350,
    height: 70,
    backgroundColor: "white",
    borderRadius: 20,
    margin: 5,
    flex: 1,
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  matchPic: {
    borderRadius: 50,
    margin: 5,
  },
  name: {
    margin: 5,
    fontSize: 20,
    fontWeight: "bold",
  },
};

export default ChatRow;
