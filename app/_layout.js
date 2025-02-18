import { StatusBar } from "react-native";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Stack screenOptions={{ headerShown: true }}></Stack>
    </>
  );
}
