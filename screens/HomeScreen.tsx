import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  Image,
  StyleProp,
  ImageBackground,
} from "react-native";
import { auth, db, storage } from "../firebaseConfig";
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
import { getDownloadURL, ref } from "firebase/storage";
import { getCompatibility } from "../services/zodiacInfo";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [image, setImage] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [users, setUsers] = useState([]);
  const swipeRef = useRef(null);
  const [zodiac, setZodiac] = useState<string>("");
  const [compatibilities, setCompatibilities] = useState<any>("");

  useEffect(() => {
    findPicture(auth.currentUser?.uid as string).then((res) =>
      setImage(res?.url)
    );
    findUser(auth.currentUser?.uid as string).then((res) => {
      setName(res?.name);
      setZodiac(res?.zodiacSign);
    });
    const fetchData = async () => {
      try {
        const usersData = await findUsers();

        if (usersData.length !== 0) {
          setUsers(usersData as any);

          await Promise.all(
            usersData.map(async (user) => {
              try {
                const url = await getDownloadURL(
                  ref(storage, `ProfilePictures/${user.id}`)
                );
                user.url = url;
              } catch (error) {
                console.error(`Error fetching URL for user ${user.id}:`, error);
              }
            })
          );
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }

      getCompatibility(zodiac).then((res) => setCompatibilities(res));
    };

    fetchData().then((r) => r);

    getDownloadURL(
      ref(storage, `ProfilePictures/${auth.currentUser?.uid}`)
    ).then((url) => setImage(url));
  }, []);

  const getBackgroundColor = (satisfaction: number) => {
    if (satisfaction == 1) {
      return "#ff80c8";
    } else if (satisfaction == 2) {
      return "#ffc2cb";
    } else {
      return "white";
    }
  };

  const swipeLeft = async (cardIndex: string | number) => {
    if (!users[cardIndex as number]) return;

    const userSwiped: any = users[cardIndex as number];

    await setDoc(
      doc(
        db,
        "Users",
        auth.currentUser?.uid as string,
        "passes",
        userSwiped.id
      ),
      userSwiped
    );
  };

  const swipeRight = async (cardIndex: string | number) => {
    if (!users[cardIndex as number]) return;

    const userSwiped: any = users[cardIndex as number];
    const loggedInUser = (
      await getDoc(doc(db, "Users", auth.currentUser?.uid as string))
    ).data();

    // check if a person already swiped on user
    getDoc(
      doc(db, "Users", userSwiped.id, "likes", auth.currentUser?.uid as string)
    ).then((snapshot) => {
      if (snapshot.exists()) {
        setDoc(
          doc(
            db,
            "Matches",
            generateId(userSwiped.id, auth.currentUser?.uid)
          ) as any,
          {
            users: {
              [auth.currentUser?.uid as string]: loggedInUser,
              [userSwiped.id]: userSwiped,
            },
            usersMatched: [auth.currentUser?.uid, userSwiped.id],
          }
        );

        navigation.navigate(
          "Match" as never,
          { loggedInUser, userSwiped } as never
        );
      } else {
      }
    });

    await setDoc(
      doc(db, "Users", auth.currentUser?.uid as string, "likes", userSwiped.id),
      userSwiped
    );
  };

  const getMatchSatisfaction = (sign: string) => {
    const satisfactionLevel =
      compatibilities[sign.toLowerCase()] &&
      compatibilities[sign.toLowerCase()][1];

    switch (satisfactionLevel) {
      case 1:
        return "Perfect! 😍";
      case 2:
        return "Good 😊";
      case 3:
        return "Fine 😐";
      case 4:
        return "Not great 😕";
      case 5:
        return "Pretty bad... 😞";
      default:
        return "???";
    }
  };

  return (
    <SafeAreaView style={shared.screen}>
      <ImageBackground
        source={require("../assets/background-4.png")}
        resizeMethod="auto"
        style={{
          width: "100%",
          height: "100%",
          alignItems: "center",
        }}
      >
        <Header />
        <View style={{ flex: 1, left: "-45%" }}>
          {users && (
            <Swiper
              ref={swipeRef}
              cards={users}
              stackSize={50}
              cardIndex={0}
              verticalSwipe={false}
              animateCardOpacity
              containerStyle={styled.containerCard}
              onSwipedLeft={(cardIndex: string | number) => {
                swipeLeft(cardIndex).then((r) => r);
              }}
              onSwipedRight={(cardIndex: string | number) => {
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
              renderCard={(card: any) => {
                if (card) {
                  const zodiac = card.zodiacSign.toLowerCase();
                  const satisfaction = compatibilities[zodiac]
                    ? compatibilities[zodiac][1]
                    : 0;

                  return (
                    <View
                      style={[
                        styled.card,
                        { backgroundColor: getBackgroundColor(satisfaction) },
                      ]}
                    >
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("UserDetails", {
                            user: card,
                          })
                        }
                      >
                        <Image
                          source={{ uri: card.url }}
                          style={styled.image}
                        />
                      </TouchableOpacity>
                      <Text style={styled.name}>
                        {card.name}, {card.age}
                      </Text>
                      <Text style={styled.zodiac}>{card.zodiacSign}</Text>
                      {compatibilities[zodiac] && (
                        <Text style={styled.compatibility}>
                          {getMatchSatisfaction(card.zodiacSign)}
                        </Text>
                      )}
                    </View>
                  );
                } else {
                  return (
                    <View style={styled.card}>
                      <Text style={styled.emoji}>&#128549;</Text>
                      <Text style={styled.noProfilesText}>
                        No more profiles
                      </Text>
                    </View>
                  );
                }
              }}
            />
          )}
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
              const ref: any = swipeRef.current;
              ref.swipeLeft();
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
              const ref: any = swipeRef.current;
              ref.swipeRight();
            }}
          >
            <AntDesign
              name="heart"
              size={35}
              style={{ color: "white", paddingTop: 15, paddingBottom: 10 }}
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styled: StyleProp<any> = {
  card: {
    backgroundColor: "white",
    borderRadius: 20,
    height: "75%",
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
    height: 400,
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
  compatibility: {
    textAlign: "center",
    marginTop: 10,
  },
  zodiac: {
    fontSize: 20,
    textAlign: "center",
  },
};

export default HomeScreen;
