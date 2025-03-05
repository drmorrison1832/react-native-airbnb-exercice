import { SafeAreaView, View, Text } from "react-native";
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
  AvatarPicker,
} from "../../components/Index";

import styles from "../../assets/styles/styles";

import AuthContext from "../../context/AuthContext";
import colors from "../../assets/styles/colors";

export default function Register() {
  console.log("Rendering Register");

  const { login } = useContext(AuthContext);

  // States for input fields
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  // refs for inputs so RETURN key jumps to next field)
  const emailRef = useRef(null);
  const usernameRef = useRef(null);
  const descriptionRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const submitButtonRef = useRef(null);

  // Submition states
  const [errorMessage, setErrorMessage] = useState("");
  const [errorFields, setErrorFields] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit() {
    const newErrorFields = [];
    setErrorMessage("");

    // If any field is empty, push it to array
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

    setIsLoading(true);

    try {
      const body = {
        email,
        username,
        description: description.trim(),
        password,
      };

      const URL =
        "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/sign_up";

      const response = await axios.post(URL, body);

      login(response.data);

      setIsLoading(false);
    } catch (error) {
      console.log(error?.response?.data?.error);

      error?.response?.data?.error.includes("email") &&
        newErrorFields.push("email");
      error?.response?.data?.error.includes("username") &&
        newErrorFields.push("username");
      error?.response?.data?.error.includes("description") &&
        newErrorFields.push("description");
      error?.response?.data?.error.includes("password") &&
        newErrorFields.push("password", "confirmPassword");

      if (newErrorFields.length === 0) {
        setErrorMessage("Something went wrong");
      } else {
        setErrorFields(newErrorFields);
        setErrorMessage(error?.response?.data?.error);
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
          <Icons.Airbnb size="M" color={colors.mainRed} />
          <ScreenTitle title="Register" />
        </View>
        <View style={[styles.containers.default, { marginTop: 20 }]}>
          <AvatarPicker state={selectedPhoto} setState={setSelectedPhoto} />
        </View>
        <ShortTextInput
          currentRef={emailRef}
          nextRef={usernameRef}
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
          currentRef={usernameRef}
          nextRef={descriptionRef}
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
          currentRef={descriptionRef}
          nextRef={passwordRef}
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
            currentRef={passwordRef}
            nextRef={confirmPasswordRef}
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
            currentRef={confirmPasswordRef}
            nextRef={submitButtonRef}
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
          <Text style={[styles.text.errorMessage]}>{errorMessage}</Text>
        </View>

        <View style={[styles.containers.default, { gap: 20 }]}>
          <DefaultButton
            currentRef={submitButtonRef}
            text="Register"
            onPress={handleSubmit}
            disabled={isLoading || errorFields.length > 0}
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
