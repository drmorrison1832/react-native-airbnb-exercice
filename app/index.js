import { View, ActivityIndicator } from "react-native";

import styles from "../assets/styles/index";

export default function Index() {
  return (
    <View style={[styles.containers.fullScreen]}>
      <ActivityIndicator size={"large"} />
    </View>
  );
}
