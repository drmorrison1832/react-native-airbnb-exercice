import { StatusBar } from "react-native";
import { Slot, router } from "expo-router";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import AuthProvider from "../context/AuthProvider";

export default function RootLayout() {
  console.log("Rendering RootLayout");
  const [userInfo, setUserInfo] = useState({});
  const [isConnected, setIsConnected] = useState(false);

  async function login(userInfo) {
    console.log("login:", userInfo);
    await AsyncStorage.setItem("storedUserInfo", JSON.stringify(userInfo));
    setUserInfo(userInfo);
    setIsConnected(true);
  }

  async function logout() {
    console.log("logout");
    await AsyncStorage.removeItem("storedUserInfo");
    setUserInfo(null);
    setIsConnected(false);
  }

  async function updateUserAsyncStorage(newUserInfo) {
    console.log("Updating Async Storage user info to", newUserInfo);
    let prevUserInfo = await JSON.parse(AsyncStorage.getItem("storedUserInfo"));
    newUserInfo.token = prevUserInfo.token;
    await AsyncStorage.setItem("storedUserInfo", JSON.stringify(newUserInfo));
    setUserInfo(newUserInfo);
    setIsConnected(true);
  }

  useEffect(() => {
    async function getCurrentUserInfoFromAsyncStorage() {
      console.log("getCurrentUserInfoFromAsyncStorage...");
      try {
        const storedUserInfo = await AsyncStorage.getItem("storedUserInfo");
        console.log("storedUserInfo is", storedUserInfo);
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
    console.log("Layout redirection (isConnected?)");
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
