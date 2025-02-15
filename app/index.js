import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";

import styles from "../assets/styles/globalStyle";

export default function App() {
  return (
    <SafeAreaView style={styles.containers.default}>
      <Text style={styles.text.title}>Bienvenue sur Expo Router !</Text>
      <Link href="/user/sign-in">
        <Text>Aller à SignIn</Text>
      </Link>

      <Link href="/user/sign-up">
        <Text>Aller à SignUp</Text>
      </Link>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
