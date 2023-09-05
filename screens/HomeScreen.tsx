import { View, Text, Button } from "react-native";
import { auth } from "../firebaseConfig";
import { signOut } from "firebase/auth";

const HomeScreen = () => {
  console.log(auth);
  return (
    <View>
      <Text>home screen</Text>
      <Button
        title="Sign Out"
        onPress={() =>
          signOut(auth)
            .then((r) => {
              console.log(r, auth);
            })
            .catch((err) => alert(err))
        }
      />
    </View>
  );
};

export default HomeScreen;
