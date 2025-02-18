import { TextInput, Text } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";

import styles from "../assets/styles/styles";

export default function ShortTextInput({
  placeholder,
  state,
  setState,
  secureTextEntry,
}) {
  return (
    <>
      <TextInput
        style={styles.inputs.default}
        placeholder={placeholder}
        value={state}
        onChangeText={setState}
        secureTextEntry={secureTextEntry}
      />

      {secureTextEntry && (
        <Text>
          <Entypo name="eye" size={24} color="black" />{" "}
          <Entypo name="eye-with-line" size={24} color="black" />
        </Text>
      )}
    </>
  );
}
