import { Text, View } from "react-native";

import styles from "../../assets/styles/styles";

export default function Map() {
  console.log("Rendering Map");
  return (
    <View style={[styles.containers.fullScreen]}>
      <Text style={styles.text.title}>Map</Text>
    </View>
  );
}
