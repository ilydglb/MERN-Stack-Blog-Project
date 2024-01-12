import { createContext, useState, useEffect } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    try {
      // Try to get authentication information from localStorage on initial load
      const storedAuth = localStorage.getItem("Auth");
      return storedAuth ? JSON.parse(storedAuth) : null;
    } catch (error) {
      console.error("Error parsing stored authentication information:", error);
      return null;
    }
  });

  useEffect(() => {
    // Store authentication information in localStorage whenever it changes
    localStorage.setItem("Auth", JSON.stringify(auth));
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
