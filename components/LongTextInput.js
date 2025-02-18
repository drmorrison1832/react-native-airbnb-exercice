import { TextInput } from "react-native";

import styles from "../assets/styles/styles";

export default function LongTextInput({ placeholder, state, setState }) {
  return (
    <TextInput
      style={[styles.inputs.multiline, { height: 100 }]}
      placeholder={placeholder}
      value={state}
      onChangeText={setState}
      multiline
      maxLength={250}
    />
  );
}
