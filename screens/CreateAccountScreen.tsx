import {
  ActivityIndicator,
  ImageBackground,
  KeyboardAvoidingView,
  Pressable,
  StyleProp,
  Text,
  TextInput,
  View,
} from "react-native";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import shared from "../styles/shared.styles";
import { createUser, updateUser } from "../services/usersService";

const CreateAccountScreen = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const firebaseAuth = auth;
  const navigation = useNavigation();
  const [nameError, setNameError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

  const incompleteForm = false; // to do form validation !name || !confirmPassword

  const signUp = async () => {
    setLoading(true);
    try {
      if (!name) {
        setNameError("Name is required.");
      } else if (!password) {
        setPasswordError("Password is required.");
      } else if (!confirmPassword) {
        setConfirmPasswordError("Password must be confirmed.");
      } else if (password.length <= 8) {
        setPasswordError("Password must be at least 8 characters long.");
      } else if (!specialChars.test(password)) {
        setPasswordError(
          "Password must contain at least one special character."
        );
      } else if (!/[A-Z]/.test(password)) {
        setPasswordError(
          "Password must contain at least one uppercase letter."
        );
      } else if (!/[a-z]/.test(password)) {
        setPasswordError(
          "Password must contain at least one lowercase letter."
        );
      } else if (!/[0-9]/.test(password)) {
        setPasswordError("Password must contain at least one number.");
      } else if (password !== confirmPassword) {
        if (confirmPassword) {
          setConfirmPasswordError("Passwords don't match");
        } else {
          setConfirmPasswordError("Password must be confirmed.");
        }
      } else {
        const { user } = await createUserWithEmailAndPassword(
          firebaseAuth,
          email,
          password
        ); //.then(() => navigation.navigate("AddPictures" as never));

        sendEmailVerification(user).then(() => {
          createUser({
            id: auth.currentUser?.uid as string,
            email: email,
            name: name,
            initialSetupDone: false,
            emailVerified: false,
          }).then((res) => res);

          alert("Verify your account with the link sent to your email.");

          navigation.navigate("Login" as never);
        });
      }
    } catch (err: any) {
      console.log(err.message);
      switch (err.message) {
        case "Firebase: Error (auth/invalid-email).":
          if (!email) {
            setEmailError("E-Mail is required.");
          } else {
            setEmailError("E-Mail is not valid.");
          }
          break;
        case "Firebase: Error (auth/email-already-in-use).":
          setEmailError(
            "There already exists an account linked to this E-Mail."
          );
          break;
        default:
          alert("Registration failed: " + err.message);
          break;
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={shared.screen}>
      <ImageBackground
        source={require("../assets/background-1.png")}
        resizeMethod="auto"
        style={{
          width: "100%",
          height: "100%",
          alignItems: "center",
        }}
      >
        <Text style={[shared.text, { marginTop: 100 }]}>
          Sign up to Zodiac Match!
        </Text>
        <View style={[shared.container, { marginTop: 60 }]}>
          <TextInput
            style={shared.input}
            placeholder=" Enter your name"
            autoCapitalize="none"
            onChangeText={(v) => {
              setName(v);
            }}
            value={name}
          ></TextInput>
          {nameError && <Text style={styled.error}>{nameError}</Text>}

          <TextInput
            style={shared.input}
            placeholder=" Enter your E-Mail"
            autoCapitalize="none"
            onChangeText={(v) => {
              setEmail(v);
            }}
            value={email}
          ></TextInput>
          {emailError && <Text style={styled.error}>{emailError}</Text>}

          <TextInput
            style={shared.input}
            placeholder=" Enter Password"
            autoCapitalize="none"
            onChangeText={(v) => {
              setPassword(v);
            }}
            value={password}
            secureTextEntry={true}
          ></TextInput>
          {passwordError && <Text style={styled.error}>{passwordError}</Text>}

          <TextInput
            style={shared.input}
            placeholder=" Confirm Password"
            autoCapitalize="none"
            onChangeText={(v) => {
              setConfirmPassword(v);
            }}
            value={confirmPassword}
            secureTextEntry={true}
          ></TextInput>
          {confirmPasswordError && (
            <Text style={styled.error}>{confirmPasswordError}</Text>
          )}

          <Pressable style={shared.button} onPress={signUp}>
            <Text style={shared.buttonText}>Create account</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              if (navigation) {
                navigation.navigate("Login" as never);
              }
            }}
          >
            <Text style={{ color: "white" }}>
              Already have an account?{" "}
              <Text style={styled.loginText}>Login</Text>
            </Text>
          </Pressable>
        </View>
      </ImageBackground>
    </View>
  );
};

const styled: StyleProp<any> = {
  loginText: {
    color: "#444444",
    fontWeight: "bold",
  },
  error: {
    fontSize: 10,
    color: "#A70D2A",
  },
};

export default CreateAccountScreen;
