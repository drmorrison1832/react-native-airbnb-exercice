import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View, Button } from "react-native";
import { Link, router } from "expo-router";

import styles from "../assets/styles/styles";

export default function App() {
  return (
    <SafeAreaView style={[styles.containers.fullScreen]}>
      <Text style={styles.text.title}>Bienvenue sur Expo Router !</Text>

      <Button
        title="Sign Up"
        onPress={() => {
          router.push("/user/sign-up");
        }}
      />

      <Button
        title="Sign In"
        onPress={() => {
          router.push("/user/sign-in");
        }}
      />

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
