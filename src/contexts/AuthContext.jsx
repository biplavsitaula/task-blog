import { createContext, useContext } from "react";
import useAuth from "../hooks/useAuth";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const { loading, login, logout, isAuthenticated, user } = useAuth();

  return (
    <AuthContext.Provider
      value={{ loading, login, logout, isAuthenticated, user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
