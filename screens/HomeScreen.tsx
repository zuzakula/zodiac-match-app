import { View, Text, Pressable, TouchableOpacity, Image } from "react-native";
import { auth, db } from "../firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import shared from "../styles/shared.styles";
import { useEffect, useRef, useState } from "react";
import { findUsers, findPicture, findUser } from "../services/usersService";
import Header from "./components/Header";
import Swiper from "react-native-deck-swiper";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { doc, getDoc, setDoc } from "firebase/firestore";
import generateId from "../lib/generateId";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [image, setImage] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [sun, setSun] = useState("");
  const [users, setUsers] = useState([]);
  const [numOfUsers, setNumOfUsers] = useState(0);
  const swipeRef = useRef(null);

  useEffect(() => {
    findPicture(auth.currentUser?.uid).then((res) => setImage(res.url));
    findUser(auth.currentUser?.uid).then((res) => setName(res.name));
    findUsers().then((res) => {
      setUsers(res);
    });
  }, []);

  const swipeLeft = async (cardIndex) => {
    if (!users[cardIndex]) return;

    const userSwiped = users[cardIndex];

    await setDoc(
      doc(
        db,
        "Users",
        auth.currentUser?.uid as string,
        "passes",
        userSwiped.email
      ),
      userSwiped
    );
  };

  const swipeRight = async (cardIndex) => {
    if (!users[cardIndex]) return;

    const userSwiped = users[cardIndex];
    const loggedInUser = await (
      await getDoc(doc(db, "Users", auth.currentUser?.uid as string))
    ).data();

    // could be a cloud function???
    getDoc(
      doc(db, "Users", userSwiped.id, "likes", auth.currentUser?.uid as string)
    ).then((snapshot) => {
      if (snapshot) {
        setDoc(
          doc(
            db,
            "Matches",
            generateId(userSwiped.id, auth.currentUser?.uid)
          ) as any,
          {
            users: {
              [auth.currentUser?.uid]: loggedInUser,
              [userSwiped.id]: userSwiped,
            },
            usersMatched: [auth.currentUser?.uid, userSwiped.id],
          }
        );

        navigation.navigate("Match", { loggedInUser, userSwiped } as any);
      } else {
      }
    });

    await setDoc(
      doc(db, "Users", auth.currentUser?.uid as string, "likes", userSwiped.id),
      userSwiped
    );
  };

  return (
    <SafeAreaView style={shared.screen}>
      <Header />
      <View style={{ flex: 1, left: "-45%" }}>
        <Swiper
          ref={swipeRef}
          cards={users}
          stackSize={3}
          cardIndex={0}
          verticalSwipe={false}
          animateCardOpacity
          containerStyle={styled.containerCard}
          onSwipedLeft={(cardIndex) => {
            swipeLeft(cardIndex).then((r) => r);
          }}
          onSwipedRight={(cardIndex) => {
            swipeRight(cardIndex).then((r) => r);
          }}
          overlayLabels={{
            left: {
              title: "NOPE",
              style: {
                label: {
                  textAlign: "right",
                  color: "red",
                },
              },
            },
            right: {
              title: "YESS",
              style: {
                label: {
                  textAlign: "left",
                  color: "green",
                },
              },
            },
          }}
          renderCard={(card) => {
            if (card) {
              return (
                <View style={styled.card}>
                  <Image source={{ uri: card.url }} style={styled.image} />
                  <Text style={styled.name}>{card.name}</Text>
                  <Text style={styled.bigThree}>
                    ☀️Saggitarius {"\n"} 🌜Leo {"\n"} ⬆️Saggitarius {"\n"}
                  </Text>
                </View>
              );
            } else {
              return (
                <View style={styled.card}>
                  <Text style={styled.emoji}>&#128549;</Text>
                  <Text style={styled.noProfilesText}>No more profiles</Text>
                </View>
              );
            }
          }}
        />
      </View>

      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "center",
          position: "relative",
          top: 270,
        }}
      >
        <TouchableOpacity
          style={{
            position: "relative",
            marginRight: 75,
            backgroundColor: "#ED7474",
            alignItems: "center",
            width: 65,
            height: 65,
            borderRadius: 50,
          }}
          onPress={() => {
            swipeRef.current.swipeLeft();
          }}
        >
          <Entypo
            name="cross"
            size={60}
            style={{ color: "white", paddingTop: 2, paddingBottom: 10 }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            position: "relative",
            marginLeft: 75,
            backgroundColor: "#74dbed",
            alignItems: "center",
            width: 65,
            height: 65,
            borderRadius: 50,
          }}
          onPress={() => {
            swipeRef.current.swipeRight();
          }}
        >
          <AntDesign
            name="heart"
            size={35}
            style={{ color: "white", paddingTop: 15, paddingBottom: 10 }}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styled = {
  card: {
    backgroundColor: "white",
    borderRadius: 20,
    height: "80%",
    width: "90%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  containerCard: {},
  image: {
    width: "95%",
    height: "75%",
    marginTop: 10,
    marginBottom: 0,
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 20,
  },
  name: {
    fontSize: 30,
    textAlign: "center",
    fontWeight: "bold",
  },
  bigThree: {
    fontSize: 16,
    textAlign: "center",
  },
  noProfilesText: {
    fontSize: 20,
    textAlign: "center",
    paddingTop: 100,
  },
  emoji: {
    paddingTop: 100,
    fontSize: 60,
    textAlign: "center",
  },
};

export default HomeScreen;
