import { SafeAreaView, View, Text, Button } from "react-native";
import { useState, useContext, useRef } from "react";
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

  // Create input fields states and refs + refs array
  const refsInOrder = [];

  const [email, setEmail] = useState("");
  const emailRef = useRef(null);
  refsInOrder.push(emailRef);

  const [username, setUsername] = useState("");
  const usernameRef = useRef(null);
  refsInOrder.push(usernameRef);

  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);
  refsInOrder.push(passwordRef);

  const [confirmPassword, setConfirmPassword] = useState("");
  const confirmPasswordRef = useRef(null);
  refsInOrder.push(confirmPasswordRef);

  const [description, setDescription] = useState("");
  const descriptionRef = useRef(null);
  refsInOrder.push(descriptionRef);

  const submitButtonRef = useRef(null);
  refsInOrder.push(submitButtonRef);

  // Create submition states
  const [errorMessage, setErrorMessage] = useState("");
  const [errorFields, setErrorFields] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit() {
    let newErrorFields = [];
    setErrorMessage("");

    email || newErrorFields.push("email");
    username || newErrorFields.push("username");
    description || newErrorFields.push("description");
    password || newErrorFields.push("password");
    confirmPassword || newErrorFields.push("confirmPassword");

    if (newErrorFields.length > 0) {
      setErrorFields(newErrorFields);
      setErrorMessage("Please fill all fields");
      return;
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
          refs={refsInOrder}
          refIndex="0"
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
          refs={refsInOrder}
          refIndex="1"
          returnKeyType="next"
          onSubmitEditing="next"
          name="username"
          placeholder="username"
          state={username}
          setState={setUsername}
          errorFields={errorFields}
          setErrorFields={setErrorFields}
        />

        <LongTextInput
          refs={refsInOrder}
          refIndex="2"
          onSubmitEditing="next"
          name="description"
          placeholder="Describe yourself in a frew words..."
          state={description}
          setState={setDescription}
          errorFields={errorFields}
          setErrorFields={setErrorFields}
        />

        <View style={[styles.containers.default, { gap: 20 }]}>
          <ShortTextInput
            refs={refsInOrder}
            refIndex="3"
            returnKeyType="next"
            onSubmitEditing="next"
            name="password"
            placeholder="password"
            state={password}
            setState={setPassword}
            errorFields={errorFields}
            setErrorFields={setErrorFields}
            secureTextEntry
          />

          <ShortTextInput
            refs={refsInOrder}
            refIndex="4"
            returnKeyType="next"
            onSubmitEditing="blur"
            name="confirmPassword"
            placeholder="confirm password"
            state={confirmPassword}
            setState={setConfirmPassword}
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
          <DefaultButton
            text="Register"
            onPress={handleSubmit}
            refs={refsInOrder}
            refIndex="5"
          />
          <View style={styles.containers.inLineDefault}>
            <NavText screen="/auth/login" text="Already have an account? " />
            <NavText screen="/auth/login" text="Login" underline />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
