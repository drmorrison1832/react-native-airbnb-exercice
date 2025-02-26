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
}) {
  const [showPassword, setShowpassword] = useState(!secureTextEntry);

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
