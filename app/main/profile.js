import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Text, View, ActivityIndicator, Image } from "react-native";
import { useContext, useState, useEffect, useRef, useCallback } from "react";
import AuthContext from "../../context/AuthContext";
import { router, Redirect } from "expo-router";
import { useFocusEffect } from "expo-router";

import axios from "axios";

import styles from "../../assets/styles/styles";

import {
  Icons,
  ScreenTitle,
  ShortTextInput,
  LongTextInput,
  NavText,
  DefaultButton,
  AvatarPicker,
} from "../../components/Index";

export default function Profile() {
  console.log("Rendering Profile");
  const { userInfo, login, logout, updateUserAsyncStorage, isConnected } =
    useContext(AuthContext);

  // Create input fields states and refs + refs array
  const [email, setEmail] = useState("");
  const emailRef = useRef(null);

  const [username, setUsername] = useState("");
  const usernameRef = useRef(null);

  const [description, setDescription] = useState("");
  const descriptionRef = useRef(null);

  const submitButtonRef = useRef(null);

  const [selectedPhoto, setSelectedPhoto] = useState(null);

  // Create retrieved user info states
  const [retrievedEmail, setRetrievedEmail] = useState("");
  const [retrievedUsername, setRetrievedUsername] = useState("");
  const [retrievedDescription, setRetrievedDescription] = useState("");
  const [retrievedPhoto, setRetrievedPhoto] = useState("");

  function updateUserStates(data) {
    data?.email && setRetrievedEmail(data.email);
    data?.username && setRetrievedUsername(data.username);
    data?.description && setRetrievedDescription(data.description.trim());
    data?.photo && setRetrievedPhoto(data.photo);
  }

  // Create submition states
  const [errorMessage, setErrorMessage] = useState("");
  const [errorFields, setErrorFields] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isConnected) {
      return;
    }
    async function getUserDataAndUpdateLocalStorage() {
      try {
        const URL =
          "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/" +
          userInfo.id;
        const config = {
          headers: { Authorization: "Bearer " + userInfo.token },
        };

        let response = await axios.get(URL, config);
        console.log("response.data is", response.data);

        updateUserStates(response.data);
        updateUserAsyncStorage(response.data);

        setEmail(response.data.email);
        setUsername(response.data.username);
        setDescription(response.data.description);

        setIsLoading(false);
      } catch (error) {
        console.error(error.message);
        setErrorMessage(error.message);

        setIsLoading(false);
      }
    }
    getUserDataAndUpdateLocalStorage();
  }, []);

  useFocusEffect(
    useCallback(() => {
      console.log(`Focused!`);
      return () => {
        console.log("Unfocused.");
        setErrorFields([]);
        setErrorMessage("");
      };
    }, [])
  );

  // RENDER

  if (!isConnected) {
    // return <Redirect href="../auth" />;
    return (
      <View style={[styles.containers.fullScreen]}>
        <DefaultButton
          text="Connection"
          onPress={() => {
            router.replace("../auth");
          }}
        />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View
        style={[
          styles.containers.fullScreen,
          { justifyContent: "space-evenly" },
        ]}
      >
        <ActivityIndicator size="large" />
        <DefaultButton text="Logout" onPress={logout}></DefaultButton>
      </View>
    );
  }

  console.log(username);

  return (
    <View style={[styles.containers.fullScreen]}>
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
          nextRef={submitButtonRef}
          name="description"
          placeholder="Describe yourself in a frew words..."
          state={description}
          setState={setDescription}
          errorFields={errorFields}
          setErrorFields={setErrorFields}
        />

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

        <DefaultButton
          text="Update info"
          currentRef={submitButtonRef}
          onPress={handleSubmit}
          disabled={
            isLoading ||
            (retrievedDescription === description &&
              retrievedEmail === email &&
              retrievedUsername === username) ||
            errorFields.length > 0
          }
        />
        <DefaultButton text="Logout" onPress={logout}></DefaultButton>
      </KeyboardAwareScrollView>
    </View>
  );

  //

  async function handleSubmit() {
    let newErrorFields = [];
    setErrorMessage("");

    email || newErrorFields.push("email");
    username || newErrorFields.push("username");
    description || newErrorFields.push("description");

    if (newErrorFields.length > 0) {
      setErrorFields(newErrorFields);
      setErrorMessage("Please fill all fields");
      return;
    }

    try {
      setIsLoading(true);

      const URL =
        "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/update";

      const body = { email, username, description: description.trim() };

      const config = {
        headers: { Authorization: "Bearer " + userInfo.token },
      };

      let response = await axios.put(URL, body, config);

      updateUserStates(response.data);
      updateUserAsyncStorage(response.data);

      setIsLoading(false);
      setErrorFields([]);
      setErrorMessage("");
    } catch (error) {
      // console.error(Object.keys(error.response));
      console.log(error.response.data.error);
      setErrorMessage(error?.response?.data?.error);
      setIsLoading(false);
      return;
    }
  }
}
