import { Text } from "react-native";
import styles from "../assets/styles/styles";

export default function ScreenTitle({ title }) {
  return (
    <Text style={[styles.text.title, { color: styles.colors.darkGrey }]}>
      {title}
    </Text>
  );
}
