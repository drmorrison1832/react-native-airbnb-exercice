import { SafeAreaView, Text, View } from "react-native";

import styles from "../../assets/styles/styles";

export default function App() {
  return (
    <SafeAreaView style={[styles.containers.fullScreen]}>
      <Text style={styles.text.title}>Home</Text>
    </SafeAreaView>
  );
}
