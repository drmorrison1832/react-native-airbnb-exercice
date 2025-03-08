import { StatusBar } from "react-native";
import { Slot, router } from "expo-router";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import AuthProvider from "../context/AuthProvider";

export default function RootLayout() {
  const [userInfo, setUserInfo] = useState({});
  const [isConnected, setIsConnected] = useState(false);

  // Declare authentification functions: logging in, logging out and updating local storage
  async function login(userInfo) {
    await AsyncStorage.setItem("storedUserInfo", JSON.stringify(userInfo));
    setUserInfo(userInfo);
    setIsConnected(true);
  }

  async function logout() {
    await AsyncStorage.removeItem("storedUserInfo");
    setUserInfo(null);
    setIsConnected(false);
  }

  async function updateUserAsyncStorage(newUserInfo) {
    const prevUserInfo = await AsyncStorage.getItem("storedUserInfo");
    const parsedPrevUserInfo = JSON.parse(prevUserInfo);
    newUserInfo.token = parsedPrevUserInfo.token;
    await AsyncStorage.setItem("storedUserInfo", JSON.stringify(newUserInfo));
    setUserInfo(newUserInfo);
    setIsConnected(true);
  }

  useEffect(() => {
    async function getCurrentUserInfoFromAsyncStorage() {
      try {
        const storedUserInfo = await AsyncStorage.getItem("storedUserInfo");

        if (storedUserInfo) {
          setUserInfo(JSON.parse(storedUserInfo));
          setIsConnected(true);
        }
      } catch (error) {
        console.error(error);
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
        setUserInfo,
        login,
        logout,
        updateUserAsyncStorage,
      }}
    >
      <StatusBar barStyle="dark-content" />
      <Slot screenOptions={{ headerShown: true }}></Slot>
    </AuthProvider>
  );
}
