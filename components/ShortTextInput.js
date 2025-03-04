import { TextInput, Text, View } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";

import styles from "../assets/styles/styles";
import { useState } from "react";

export default function ShortTextInput({
  placeholder,
  state,
  setState,
  secureTextEntry,
  name,
  errorFields,
  setErrorFields,
  returnKeyType,
  // refs,
  // refIndex,
  onSubmitEditing,
  currentRef,
  nextRef,
}) {
  const [showPassword, setShowpassword] = useState(!secureTextEntry);

  function handleOnSubmitEditing() {
    onSubmitEditing &&
      typeof onSubmitEditing === "function" &&
      onSubmitEditing();

    // I suppose onSubmitEditing is either a function or a string:
    switch (onSubmitEditing) {
      case "blur":
        // Just closes (blurs) keyboard
        null;
        break;
      case "next":
        return nextRef ? nextRef.current?.focus() : null;
      // // If there's still a ref, focus on it.
      // if (refIndex && refs.length > Number(refIndex) + 1) {
      //   refs[Number(refIndex) + 1].current?.focus();
      // }
      // // If it's the last reference, loop back to the first reference
      // if (refIndex && refs.length === Number(refIndex) + 1) {
      //   refs[0].current?.focus();
      // }
      // break;
      default:
        // Do nothing, i. e. blurAndSubmit
        break;
    }
  }

  return (
    <View
      style={[
        styles.containers.shortTextInputContainer,
        errorFields.includes(name) && styles.containers.errorInputContainer,
      ]}
    >
      <TextInput
        style={[styles.inputs.default]}
        placeholder={placeholder}
        value={state}
        maxLength={50}
        onChange={(event) => {
          setState(event.nativeEvent.text);
          if (errorFields.indexOf(name) !== -1) {
            let newErrorFields = [...errorFields];
            newErrorFields.splice(errorFields.indexOf(name), 1);
            setErrorFields(newErrorFields);
          }
        }}
        secureTextEntry={!showPassword}
        returnKeyType={returnKeyType || "next"}
        // ref={refs?.[refIndex] || null}
        ref={currentRef || null}
        onSubmitEditing={handleOnSubmitEditing}
      />
      {secureTextEntry && (
        <Entypo
          name={showPassword ? "eye-with-line" : "eye"}
          size={24}
          style={{ marginRight: 10 }}
          color="black"
          onPress={() => {
            setShowpassword((prev) => !prev);
          }}
        />
      )}
    </View>
  );
}
