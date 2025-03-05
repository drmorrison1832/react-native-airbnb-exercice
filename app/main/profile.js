import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Text, View, ActivityIndicator, Image } from "react-native";
import { useContext, useState, useEffect, useRef, useCallback } from "react";
import AuthContext from "../../context/AuthContext";
import { router, Redirect } from "expo-router";
import { useFocusEffect } from "expo-router";

import axios from "axios";

import styles from "../../assets/styles/styles";

import {
  ShortTextInput,
  LongTextInput,
  DefaultButton,
  AvatarPicker,
} from "../../components/Index";
import colors from "../../assets/styles/colors";

export default function Profile() {
  console.log("Rendering Profile");
  const { userInfo, logout, updateUserAsyncStorage, isConnected } =
    useContext(AuthContext);

  // States for input fields
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [currentPhotoURL, setcurrentPhotoURL] = useState(
    userInfo?.photo?.url || null
  );
  const [newPhoto, setNewPhoto] = useState(null);

  // refs for inputs so RETURN key jumps to next field)
  const emailRef = useRef(null);
  const usernameRef = useRef(null);
  const descriptionRef = useRef(null);
  const submitButtonRef = useRef(null);

  // Retrieved user info states
  const [retrievedEmail, setRetrievedEmail] = useState("");
  const [retrievedUsername, setRetrievedUsername] = useState("");
  const [retrievedDescription, setRetrievedDescription] = useState("");

  function updateRetrievedStates(data) {
    // Reference needed to know if inputs changed
    data?.email && setRetrievedEmail(data.email);
    data?.username && setRetrievedUsername(data.username);
    data?.description && setRetrievedDescription(data.description);
  }

  function updateInputStates(data) {
    // After each server request form fields will match server response
    data?.email && setEmail(data.email);
    data?.username && setUsername(data.username);
    data?.description && setDescription(data.description);
  }

  // Submition states
  const [errorMessage, setErrorMessage] = useState("");
  const [errorFields, setErrorFields] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useFocusEffect(
    // Replaces useEffect: https://docs.expo.dev/versions/latest/sdk/router/
    useCallback(() => {
      // Reduces frequency of effect, allows dependency array
      if (!isConnected) {
        return;
      }
      async function getUserDataAndUpdateLocalStorage() {
        setIsLoading(true);
        try {
          const URL =
            "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/" +
            userInfo.id;
          const config = {
            headers: { Authorization: "Bearer " + userInfo.token },
          };

          const response = await axios.get(URL, config);
          console.log("response.data is", response.data);

          updateUserAsyncStorage(response.data);
          updateRetrievedStates(response.data);
          updateInputStates(response.data);

          setIsLoading(false);
        } catch (error) {
          setErrorMessage(error?.response?.data?.error || error.message);
          setIsLoading(false);
        }
      }
      getUserDataAndUpdateLocalStorage();

      return () => {
        // Errors are reinitialized when switching to another tab
        setErrorFields([]);
        setErrorMessage("");
      };
    }, [])
  );

  async function handleSubmit() {
    const newErrorFields = [];
    setErrorFields([]);
    setErrorMessage("");

    // If any field is empty, push it to array
    email || newErrorFields.push("email");
    username || newErrorFields.push("username");
    description || newErrorFields.push("description");

    if (newErrorFields.length > 0) {
      setErrorFields(newErrorFields);
      setErrorMessage("Please fill all fields");
      return;
    }

    setIsLoading(true);

    try {
      if (newPhoto) {
        console.log("Uploading new photo...");

        const URLUserPhoto =
          "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/upload_picture";

        const formData = new FormData();

        formData.append("photo", newPhoto);

        const configUserPhoto = {
          headers: { Authorization: "Bearer " + userInfo.token },
          "Content-Type": "multipart/form-data",
        };

        await axios.put(URLUserPhoto, formData, configUserPhoto);
      }

      console.log("Uploading user info...");

      const URLUserInfo =
        "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/update";

      const bodyUserInfo = { email, username, description: description.trim() };

      const configUserInfo = {
        headers: { Authorization: "Bearer " + userInfo.token },
      };

      const responseUserInfo = await axios.put(
        URLUserInfo,
        bodyUserInfo,
        configUserInfo
      );

      console.log("Updating local user info...");
      console.log(responseUserInfo.data);
      updateUserAsyncStorage(responseUserInfo.data);
      updateRetrievedStates(responseUserInfo.data);
      updateInputStates(responseUserInfo.data);

      setIsLoading(false);
    } catch (error) {
      // HAVEN'T TESTED THIS
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

  return (
    <View style={[styles.containers.fullScreen]}>
      <KeyboardAwareScrollView
        style={[{ alignSelf: "stretch", borderWidth: 0 }]}
        contentContainerStyle={[
          {
            padding: 30,
            gap: 20,
          },
        ]}
      >
        <View style={[styles.containers.default, { marginVertical: 20 }]}>
          <AvatarPicker
            state={newPhoto}
            setState={setNewPhoto}
            currentPhotoURL={currentPhotoURL}
          />
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
          style={email === retrievedEmail && { color: colors.darkGrey }}
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
          style={username === retrievedUsername && { color: colors.darkGrey }}
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
          style={
            description === retrievedDescription && { color: colors.darkGrey }
          }
        />

        <View style={[styles.containers.default, { height: 25 }]}>
          <Text style={[styles.text.errorMessage]}>{errorMessage}</Text>
        </View>
        <View style={[styles.containers.default, { gap: 20, borderWidth: 0 }]}>
          <DefaultButton
            text="Update info"
            currentRef={submitButtonRef}
            onPress={handleSubmit}
            // If any field changed or if user choses a new photo, then submitting is enabled
            disabled={
              isLoading ||
              (retrievedDescription === description &&
                retrievedEmail === email &&
                retrievedUsername === username &&
                !newPhoto) ||
              errorFields.length > 0
            }
          />
          <DefaultButton text="Logout" onPress={logout}></DefaultButton>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
