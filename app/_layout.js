import { StatusBar } from "react-native";
import { Stack, Slot, router } from "expo-router";
import { useState, useEffect, useContext } from "react";

import AuthContext from "../context/AuthContext";

export default function RootLayout() {
  const [currentUsername, setCurrentUsername] = useState("test username");
  const [currentToken, setCurrentToken] = useState("test token");

  // const context = useContext(AuthContext);
  // console.log("AuthContext as recived by _layout is:", context);

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
    <AuthContext.Provider
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
    </AuthContext.Provider>
  );
}
