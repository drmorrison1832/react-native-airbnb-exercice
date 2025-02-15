import { SafeAreaView, View, Text, StyleSheet } from "react-native";

import styles from "../../assets/styles/styles";

export default function SignUp() {
  return (
    <SafeAreaView style={styles.containers.default}>
      <Text style={[styles.text.title, styles.debugging.redBorder]}>
        Sing Up
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
