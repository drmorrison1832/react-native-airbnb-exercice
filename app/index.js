import { Redirect } from "expo-router";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

export default function Index() {
  const { username, setUsername, token, setToken, login, logout } =
    useContext(AuthContext);

  return <Redirect href="/auth/login" />;
}
