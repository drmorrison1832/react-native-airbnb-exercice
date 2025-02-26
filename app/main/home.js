import { Text, View } from "react-native";

import styles from "../../assets/styles/styles";

export default function Home() {
  return (
    <View style={[styles.containers.fullScreen]}>
      <Text style={styles.text.title}>Home</Text>
    </View>
  );
}
