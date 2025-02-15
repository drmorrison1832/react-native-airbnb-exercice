import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";

import globalStyle from "../assets/styles/globalStyle";

export default function App() {
  return (
    <SafeAreaView style={globalStyle.containers.container}>
      <Text style={globalStyle.text.title}>Bienvenue sur Expo Router !</Text>
      <Link href="/user/sign-in">
        <Text>Aller à SignIn</Text>
      </Link>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = globalStyle;
// const styles = StyleSheet.create(globalStyle);
