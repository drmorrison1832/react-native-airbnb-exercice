import { createContext, useState } from "react";

const AuthContext = createContext();
// console.log(AuthContext);

export default AuthContext;

// export function AuthContextProvider({ children }) {
//   //   const [userID, setUserID] = useState(null);
//   const [username, setUsername] = useState(true);
//   const [token, setToken] = useState(null);

//   function login(username, token) {
//     setUsername(username);
//     setToken(token);
//   }

//   function logout() {
//     setUsername(null);
//     setToken(null);
//   }

//   return (
//     <AuthContext.Provider value={{ username, token, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }
