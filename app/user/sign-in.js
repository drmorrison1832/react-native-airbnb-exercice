import { SafeAreaView, View, Text, Button } from "react-native";
import { Link, router } from "expo-router";

import styles from "../../assets/styles/styles";

export default function SignIn() {
  return (
    <SafeAreaView style={styles.containers.default}>
      <Text style={[styles.text.title, styles.debugging.redBorder]}>
        Sing In
      </Text>

      <Button
        title="Back"
        onPress={() => {
          router.back();
        }}
      />
    </SafeAreaView>
  );
}
