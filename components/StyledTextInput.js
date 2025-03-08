import { TextInput } from "react-native";
import styles from "../assets/styles/styles";

export default function StyledTextInput({
  value,
  setValue,
  show,
  placeHolder,
}) {
  return (
    <TextInput
      style={[styles.inputs.default, styles.debugging.redBorder]}
      placeHolder={placeHolder}
    />
  );
}
