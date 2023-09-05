import { View, Text, Button, TextInput, ActivityIndicator } from "react-native";
import { useState } from "react";
import { auth } from "../firebaseConfig";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

const LoginScreen = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const firebaseAuth = auth;

  const signIn = async () => {
    setLoading(true);
    try {
      const res = await signInWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );
    } catch (err) {
      alert("Sign in failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async () => {
    setLoading(true);
    try {
      const res = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );
    } catch (err) {
      alert("Registration failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      <Text>L O G I N </Text>
      <TextInput
        placeholder="E-Mail"
        autoCapitalize="none"
        onChangeText={(v) => {
          setEmail(v);
        }}
        value={email}
      ></TextInput>
      <TextInput
        placeholder="Password"
        autoCapitalize="none"
        onChangeText={(v) => {
          setPassword(v);
        }}
        value={password}
        secureTextEntry={true}
      ></TextInput>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <Button title="Sign in" onPress={signIn} />
          <Button title="Create account" onPress={signUp} />
        </>
      )}
      {/*<Button title="login with google" onPress={() => promptAsync()} />*/}
    </View>
  );
};

export default LoginScreen;
