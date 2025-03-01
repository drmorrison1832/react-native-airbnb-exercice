import { SafeAreaView, View, Text, Button } from "react-native";
import { useState, useContext } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";

import {
  Icons,
  ScreenTitle,
  ShortTextInput,
  LongTextInput,
  NavText,
  DefaultButton,
} from "../../components/Index";

import styles from "../../assets/styles/styles";

import AuthContext from "../../context/AuthContext";
import colors from "../../assets/styles/colors";

export default function Register() {
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorFields, setErrorFields] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit() {
    let newErrorFields = [];
    setErrorMessage("");

    switch (true) {
      case !email:
        newErrorFields.push("email");
      case !username:
        newErrorFields.push("username");
      case !description:
        newErrorFields.push("description");
      case !password:
        newErrorFields.push("password");
      case !confirmPassword:
        newErrorFields.push("confirmPassword");
      default:
        if (newErrorFields.length > 0) {
          setErrorFields(newErrorFields);
          setErrorMessage("Please fill all fields");
          return;
        }
    }

    if (password !== confirmPassword) {
      setErrorFields(["password", "confirmPassword"]);
      setErrorMessage("Passwords don't match");
      return;
    }

    // Axios
    setIsLoading(true);

    const body = {
      email,
      username,
      description,
      password,
    };

    try {
      let response = await axios.post(
        "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/sign_up",
        body
      );

      login(response.data);

      setIsLoading(false);
      setErrorFields([]);
      setErrorMessage("");
    } catch (error) {
      console.error(error.message);
      switch (error?.status) {
        case 400:
          setErrorFields(["email", "username"]);
          setErrorMessage("Email or user already registered");
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
    <SafeAreaView style={[styles.containers.fullScreen, { borderWidth: 0 }]}>
      <KeyboardAwareScrollView
        style={[{ alignSelf: "stretch", borderWidth: 0 }]}
        contentContainerStyle={[
          {
            justifyContent: "space-between",
            padding: 30,
            gap: 20,
            borderWidth: 0,
          },
        ]}
      >
        <View style={[styles.containers.default, { gap: 20 }]}>
          <Icons.Airbnb size="large" color={colors.mainRed} />
          <ScreenTitle title="Register" />
        </View>
        <ShortTextInput
          placeholder="email"
          state={email}
          setState={setEmail}
          name="email"
          errorFields={errorFields}
          setErrorFields={setErrorFields}
        />
        <ShortTextInput
          placeholder="username"
          state={username}
          setState={setUsername}
          name="username"
          errorFields={errorFields}
          setErrorFields={setErrorFields}
        />

        <LongTextInput
          placeholder="Describe yourself in a frew words..."
          state={description}
          setState={setDescription}
          name="description"
          errorFields={errorFields}
          setErrorFields={setErrorFields}
        />

        <View style={[styles.containers.default, { gap: 20 }]}>
          <ShortTextInput
            placeholder="password"
            state={password}
            setState={setPassword}
            name="password"
            errorFields={errorFields}
            setErrorFields={setErrorFields}
            secureTextEntry
          />

          <ShortTextInput
            placeholder="confirm password"
            state={confirmPassword}
            setState={setConfirmPassword}
            name="confirmPassword"
            errorFields={errorFields}
            setErrorFields={setErrorFields}
            secureTextEntry
          />
        </View>
        <View style={[styles.containers.default, { height: 25 }]}>
          <Text
            style={[
              styles.text.errorMessage,
              // errorMessage ? { display: "flex" } : { display: "none" },
            ]}
          >
            {errorMessage}
          </Text>
        </View>
        <View style={[styles.containers.default, { gap: 20 }]}>
          <DefaultButton text="Register" onPress={handleSubmit} />
          <NavText screen="/auth/login" text="Already have an account? Login" />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
