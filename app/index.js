import { Redirect } from "expo-router";
import { useContext } from "react";
import { Text, View, ActivityIndicator } from "react-native";

import styles from "../assets/styles/styles";
import AuthContext from "../context/AuthContext";

export default function Index() {
  const { username, setUsername, token, setToken, login, logout } =
    useContext(AuthContext);
  return (
    <View style={[styles.containers.fullScreen]}>
      <ActivityIndicator size={"large"} />
    </View>
  );
}
