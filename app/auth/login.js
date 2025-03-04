import { SafeAreaView, View, Text, Pressable } from "react-native";

import { useState, useContext, useRef } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ActivityIndicator } from "react-native";
// import handleConnection from "../../utils/handleConnection";

import axios from "axios";

import {
  Icons,
  ScreenTitle,
  ShortTextInput,
  NavText,
  DefaultButton,
} from "../../components/Index";

import colors from "../../assets/styles/colors";

import styles from "../../assets/styles/styles";

import AuthContext from "../../context/AuthContext";

export default function Login() {
  console.log("Rendering Login");

  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const emailRef = useRef(null);

  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);

  const submitButtonRef = useRef(null);

  // Create submition states
  const [errorMessage, setErrorMessage] = useState("");
  const [errorFields, setErrorFields] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit() {
    console.log("handleSubmit...");
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
      console.error(error.message);
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
          <Icons.Airbnb size="M" color={colors.mainRed} />
          <ScreenTitle title="Login" />
        </View>

        <View style={[styles.containers.default, { gap: 20, borderWidth: 0 }]}>
          <ShortTextInput
            currentRef={emailRef}
            nextRef={passwordRef}
            returnKeyType="next"
            onSubmitEditing="next"
            name="email"
            placeholder="email"
            state={email}
            setState={setEmail}
            errorFields={errorFields}
            setErrorFields={setErrorFields}
          />
          <ShortTextInput
            currentRef={passwordRef}
            nextRef={submitButtonRef}
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
            name="password"
            placeholder="password"
            state={password}
            setState={setPassword}
            errorFields={errorFields}
            setErrorFields={setErrorFields}
            secureTextEntry
          />
        </View>
        <Pressable
          onPress={() => {
            alert(`Well, thats annoying...`);
          }}
        >
          <Text style={{ textDecorationLine: "underline" }}>
            Forgot your password?
          </Text>
        </Pressable>
        <View style={[{ height: 25 }]}>
          <Text style={[styles.text.errorMessage]}>{errorMessage}</Text>
          {isLoading && <ActivityIndicator />}
        </View>

        <View style={[styles.containers.default, { gap: 20, borderWidth: 0 }]}>
          <DefaultButton
            text="Login"
            onPress={handleSubmit}
            disabled={isLoading}
            currentRef={submitButtonRef}
          />
          <View style={styles.containers.inLineDefault}>
            <NavText screen="/auth/register" text="No account? " />
            <NavText screen="/auth/register" text="Register" underline />
          </View>

          <NavText
            screen="../main"
            text="Or just wander arround... "
            underline
          />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
