import { StatusBar } from "react-native";
import { Stack, Slot, router } from "expo-router";
import { useState, useEffect } from "react";

import AuthProvider from "../context/AuthProvider";

export default function RootLayout() {
  const [currentUsername, setCurrentUsername] = useState("test username");
  const [currentToken, setCurrentToken] = useState("test token");

  function login(username, token) {
    console.log("logged in");
    setCurrentUsername(username);
    setCurrentToken(token);
  }

  function logout() {
    console.log("logged out");
    setCurrentUsername(null);
    setCurrentToken(null);
  }

  useEffect(() => {
    console.log("Current user is", currentUsername);
    if (currentToken) {
      router.replace("/main");
    } else router.replace("/auth");
  }, [currentToken]);

  return (
    <AuthProvider
      value={{
        currentUsername,
        setCurrentUsername,
        currentToken,
        setCurrentToken,
        login,
        logout,
      }}
    >
      <StatusBar barStyle="dark-content" />
      <Slot screenOptions={{ headerShown: true }}></Slot>
    </AuthProvider>
  );
}
