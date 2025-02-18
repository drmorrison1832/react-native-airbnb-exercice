import { View } from "react-native";

import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

import styles from "../assets/styles/styles";

export default function Logo() {
  return (
    <FontAwesome5 name="airbnb" size={120} color={styles.colors.mainRed} />
  );
}
