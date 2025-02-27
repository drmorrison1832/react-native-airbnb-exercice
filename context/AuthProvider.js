import { useState, useContext } from "react";
import AuthContext from "./AuthContext";

export default function AuthProvider({ children, value }) {
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
