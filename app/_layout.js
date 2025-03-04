import { StatusBar } from "react-native";
import { Slot, router } from "expo-router";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import AuthProvider from "../context/AuthProvider";

export default function RootLayout() {
  console.log("Rendering RootLayout");
  const [userInfo, setUserInfo] = useState({});
  const [isConnected, setIsConnected] = useState(false);

  async function login(newUserInfo) {
    console.log("login:", newUserInfo);
    await AsyncStorage.setItem("storedUserInfo", JSON.stringify(newUserInfo));
    setUserInfo(newUserInfo);
    setIsConnected(true);
  }

  async function logout() {
    console.log("logout");
    await AsyncStorage.removeItem("storedUserInfo");
    setUserInfo(null);
    setIsConnected(false);
  }

  useEffect(() => {
    async function getCurrentUserInfoFromAsyncStorage() {
      try {
        const storedUserInfo = await AsyncStorage.getItem("storedUserInfo");
        // console.log("storedUserInfo is", storedUserInfo);
        if (storedUserInfo) {
          setUserInfo(JSON.parse(storedUserInfo));
          setIsConnected(true);
        }
      } catch (error) {
        console.log(error);
        alert("Something went wrong");
      }
    }
    getCurrentUserInfoFromAsyncStorage();
  }, []);

  useEffect(() => {
    if (isConnected) {
      router.replace("/main");
    } else {
      router.replace("/auth");
    }
  }, [isConnected]);

  return (
    <AuthProvider
      value={{
        isConnected,
        userInfo,
        login,
        logout,
      }}
    >
      <StatusBar barStyle="dark-content" />
      <Slot screenOptions={{ headerShown: true }}></Slot>
    </AuthProvider>
  );
}
