import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Text, View, ActivityIndicator, Image } from "react-native";
import { useContext, useState, useEffect, useRef, useCallback } from "react";
import AuthContext from "../../context/AuthContext";
import { router } from "expo-router";
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
  const { userInfo, logout, updateUserAsyncStorage, isConnected } =
    useContext(AuthContext);

  // States for input fields
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [newPhoto, setNewPhoto] = useState(null);

  // Photo to show when mounting this screen.
  //
  const currentPhotoURL = userInfo?.photo?.url || null;

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

          updateInputStates(response.data);
          updateRetrievedStates(response.data);
          await updateUserAsyncStorage(response.data);
        } catch (error) {
          console.error(error);
          setErrorMessage(error?.response?.data?.error || error.message);
        }
        setIsLoading(false);
      }
      getUserDataAndUpdateLocalStorage();

      return () => {
        // Errors are reinitialized when switching to another screen
        setErrorFields([]);
        setErrorMessage("");
      };
    }, [retrievedEmail, retrievedUsername, retrievedDescription])
  );

  async function handleSubmit() {
    const newErrorFields = [];
    setErrorFields([]);
    setErrorMessage("");

    // If a field is empty, push its name to ErrorFields array
    email || newErrorFields.push("email");
    username || newErrorFields.push("username");
    description || newErrorFields.push("description");

    if (newErrorFields.length > 0) {
      setErrorFields(newErrorFields);
      setErrorMessage("Please fill all fields");
      return;
    }

    setIsLoading(true);

    if (newPhoto) {
      // Upload newPhoto
      try {
        const uploadPhotoURL =
          "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/upload_picture";

        const formData = new FormData();

        formData.append("photo", newPhoto);

        const configUserPhoto = {
          headers: { Authorization: "Bearer " + userInfo.token },
          "Content-Type": "multipart/form-data",
        };
        const response = await axios.put(
          uploadPhotoURL,
          formData,
          configUserPhoto
        );

        updateInputStates(response.data);
        updateRetrievedStates(response.data);
        await updateUserAsyncStorage(response.data);

        setNewPhoto(null);
      } catch (error) {
        console.error(error);
        setErrorMessage("Error updating photo");
      }
    }

    if (
      retrievedDescription !== description ||
      (retrievedEmail !== email) | (retrievedUsername === username)
    ) {
      // Upload updated user info
      try {
        const updateInfoURL =
          "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/update";

        const bodyUserInfo = {
          email,
          username,
          description: description.trim(),
        };

        const configUserInfo = {
          headers: { Authorization: "Bearer " + userInfo.token },
        };

        const response = await axios.put(
          updateInfoURL,
          bodyUserInfo,
          configUserInfo
        );
        updateInputStates(response.data);
        updateRetrievedStates(response.data);
        await updateUserAsyncStorage(response.data);
      } catch (error) {
        console.error(error);

        // If server gives a specific error message, hightlight input field
        error?.response?.data?.error.includes("email") &&
          newErrorFields.push("email");
        error?.response?.data?.error.includes("username") &&
          newErrorFields.push("username");
        error?.response?.data?.error.includes("description") &&
          newErrorFields.push("description");
        error?.response?.data?.error.includes("password") &&
          newErrorFields.push("password", "confirmPassword");

        if (newErrorFields.length !== 0) {
          setErrorFields(newErrorFields);
          setErrorMessage(
            `Error updating info. ${error?.response?.data?.error || null}`
          );
        }
      }
    }

    setIsLoading(false);
    return;
  }

  if (!isConnected) {
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
            currentPhotoURL={userInfo?.photo?.url}
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
