import { View, Text, Button } from "react-native";

const LoginScreen = ({ promptAsync }) => {
  return (
    <View>
      <Text>login screen </Text>
      <Button title="login" onPress={() => promptAsync()} />
    </View>
  );
};

export default LoginScreen;
