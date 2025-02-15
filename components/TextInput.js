import { TextInput, View } from "react-native";

export default function TextInput({ value, setValue, show }) {
  return (
    <TextInput
      style={inputs.defaultTextInput}
      //   onChangeText={(text) => {
      // setEmail(setValue);
      //   }}
      value={value}
    />
  );
}
