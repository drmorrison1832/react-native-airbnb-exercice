import { SafeAreaView, View, Text } from "react-native";
import { Link } from "expo-router";
import { useState, useContext } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ActivityIndicator } from "react-native";
// import handleConnection from "../../utils/handleConnection";

import axios from "axios";

import {
  Logo,
  ScreenTitle,
  ShortTextInput,
  NavText,
  DefaultButton,
} from "../../components/Index";

import styles from "../../assets/styles/styles";

import AuthContext from "../../context/AuthContext";

export default function Login() {
  console.log("Rendering Login");

  const { username, setUsername, token, setToken, login, logout } =
    useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorFields, setErrorFields] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit() {
    let newErrorFields = [];
    setErrorMessage("");

    switch (true) {
      case !email:
        newErrorFields.push("email");
      case !password:
        newErrorFields.push("password");
      default:
        if (newErrorFields.length > 0) {
          setErrorFields(newErrorFields);
          setErrorMessage("Please fill all fields");
          return;
        }
    }

    // Axios request

    setIsLoading(true);

    const body = {
      email,
      password,
    };

    try {
      let response = await axios.post(
        "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/log_in",
        body
      );

      login(response.data);

      setIsLoading(false);
      setErrorFields([]);
      setErrorMessage("");
    } catch (error) {
      console.error(error);
      switch (error?.status) {
        case 400:
          setErrorFields(["email", "password"]);
          setErrorMessage("Wrong email or password");
          break;
        default:
          setErrorFields([]);
          setErrorMessage("Something went wrong");
          break;
      }

      setIsLoading(false);
      return;
    }
  }

  return (
    <SafeAreaView style={[styles.containers.fullScreen]}>
      <KeyboardAwareScrollView
        style={[{ alignSelf: "stretch", borderWidth: 0 }]}
        contentContainerStyle={[
          styles.containers.fullScreen,

          {
            justifyContent: "space-between",
            padding: 30,
            gap: 20,
            borderWidth: 0,
          },
        ]}
      >
        <View style={[styles.containers.default, { gap: 20, borderWidth: 0 }]}>
          <Logo />
          <ScreenTitle title="Login" />
        </View>

        <View style={[styles.containers.default, { gap: 20, borderWidth: 0 }]}>
          <ShortTextInput
            placeholder="email"
            state={email}
            setState={setEmail}
            name="email"
            errorFields={errorFields}
            setErrorFields={setErrorFields}
          />
          <ShortTextInput
            placeholder="password"
            state={password}
            setState={setPassword}
            name="password"
            errorFields={errorFields}
            setErrorFields={setErrorFields}
            secureTextEntry
          />
        </View>
        <View style={[{ height: 25 }]}>
          <Text style={[styles.text.errorMessage]}>{errorMessage}</Text>
          {isLoading && <ActivityIndicator />}
        </View>

        <View style={[styles.containers.default, { gap: 20, borderWidth: 0 }]}>
          <DefaultButton
            text="Login"
            onPress={handleSubmit}
            disabled={isLoading}
          />
          <NavText screen="/auth/register" text="No account? Register" />
          <Text>Did you forget your password?</Text>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
