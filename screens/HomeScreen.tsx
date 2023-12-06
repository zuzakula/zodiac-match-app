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

const HomeScreen = () => {
  const navigation = useNavigation();
  const [image, setImage] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [users, setUsers] = useState([]);
  const swipeRef = useRef(null);

  useEffect(() => {
    findPicture(auth.currentUser?.uid as string).then((res) =>
      setImage(res?.url)
    );
    findUser(auth.currentUser?.uid as string).then((res) => setName(res?.name));
    const fetchData = async () => {
      try {
        const usersData = await findUsers();

        if (usersData.length !== 0) {
          setUsers(usersData);
          // console.log(usersData);

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
    };

    fetchData().then((r) => r);

    getDownloadURL(
      ref(storage, `ProfilePictures/${auth.currentUser?.uid}`)
    ).then((url) => setImage(url));
  }, []);

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
    const loggedInUser = await (
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

  const usersFixed = [
    {
      age: 20,
      bio: "hi",
      birthdayDate: "1/13/2003",
      email: "zuza@test.com",
      id: "5KzneoHr4vMua6XB4DmPeyNnuQp2",
      name: "Zuza",
      url: "file:///data/user/0/com.zuzakula.zodiacmatchapp/cache/ImagePicker/1faec3d3-bcba-4ca6-8fc2-9f0ad2e6b1d3.jpeg",
      zodiacSign: "Capricorn",
    },
    {
      age: 23,
      bio: ":)))))))))))))",
      birthdayDate: "12/12/1999",
      email: "spencer@test.com",
      id: "EqNuE2JKo7TYiypZkUlPup5zA9a2",
      name: "Spencer",
      url: "file:///data/user/0/com.zuzakula.zodiacmatchapp/cache/ImagePicker/2d559e8d-6a95-42c0-a323-37c14496f701.jpeg",
      zodiacSign: "Sagittarius",
    },
    {
      age: "30",
      bio: "bio",
      birthdayDate: "9/2/1993",
      email: "emily@test.com",
      id: "fv94gMxqMgYYgG6hEbI9dziKL4u1",
      name: "Emily",
      url: "file:///data/user/0/com.zuzakula.zodiacmatchapp/cache/ImagePicker/969d9d02-4539-4aa4-a7ab-8144fac89568.jpeg",
      zodiacSign: "Virgo",
    },
    {
      bio: "my bio :)",
      email: "jack@test.com",
      id: "oaYXUvwlMjWThNKJleapis.com/v0/b/zodiac-match-app.appspot.com/o/ProfilePictures%2FoaYXUvwlMjWThNKJ9OxmofYfLZT2?alt=media&token=98bd879a-3e1b-4fa6-8e03-facefa0f76a9",
    },
    {
      bio: "my hobbies",
      birthdayDate: "5/10/1995",
      email: "paul@test.com",
      id: "ssgL2JzbADaJ1R7SxdnUDe3RyE03",
      name: "Paul",
      url: "https://firebasestorage.googleapis.com/v0/b/zodiac-match-app.appspot.com/o/ProfilePictures%2FssgL2JzbADaJ1R7SxdnUDe3RyE03?alt=media&token=4985d2d6-c6f0-478c-baec-c5eb414368b1",
      zodiacSign: "Taurus",
    },
  ];

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
              stackSize={usersFixed.length}
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
                  return (
                    <View style={styled.card}>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("UserDetails", {
                            user: card,
                          } as any)
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
    height: "85%",
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
  zodiac: {
    fontSize: 20,
    textAlign: "center",
  },
};

export default HomeScreen;
