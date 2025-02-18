import { StatusBar } from "react-native";
import { Stack } from "expo-router";
import { createContext, useState } from "react";

export const AuthContext = createContext();

export default function RootLayout() {
  const [isAuthentified, setIsAutenthified] = useState(false);

  return (
    <AuthContext.Provider value={{ isAuthentified, setIsAutenthified }}>
      <StatusBar barStyle="dark-content" />
      <Stack screenOptions={{ headerShown: true }}></Stack>
    </AuthContext.Provider>
  );
}
