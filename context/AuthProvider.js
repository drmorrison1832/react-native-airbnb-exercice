import { useState, useContext } from "react";
import AuthContext from "./AuthContext";

export default function AuthProvider({ children }) {
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
    <AuthContext.Provider value={{ username, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
