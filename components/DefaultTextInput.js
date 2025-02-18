import { TextInput } from "react-native";

import styles from "../assets/styles/styles";

export default function DefaultTextInput({
  placeholder,
  state,
  setState,
  secureTextEntry,
}) {
  return (
    <TextInput
      style={styles.inputs.default}
      placeholder={placeholder}
      value={state}
      onChangeText={setState}
      secureTextEntry={secureTextEntry}
    />
  );
}
