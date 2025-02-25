import { StatusBar } from "react-native";
import { Stack } from "expo-router";
import { createContext, useState } from "react";

import AuthContext from "../context/AuthContext";
// console.log(AuthContext);

export default function RootLayout() {
  const [username, setUsername] = useState(null);
  const [token, setToken] = useState(null);

  function login(username, token) {
    setUsername(username);
    setToken(token);
  }

  function logout() {
    setUsername(null);
    setToken(null);
  }

  return (
    <AuthContext.Provider
      value={{ username, setUsername, token, setToken, login, logout }}
    >
      <StatusBar barStyle="dark-content" />
      <Stack screenOptions={{ headerShown: true }}></Stack>
    </AuthContext.Provider>
  );
}
