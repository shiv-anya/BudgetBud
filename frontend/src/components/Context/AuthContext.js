import { createContext, useState } from "react";

const initialState = {
  isLoggedIn: false,
  userId: "",
  userToken: "",
};

const AuthContext = createContext({
  ...initialState,
  login: () => {},
  signup: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState("");
  const [userToken, setUserToken] = useState("");

  const login = (userId, userToken) => {
    setIsLoggedIn(true);
    setUserId(userId);
    setUserToken(userToken);
  };
  const signup = (userId, userToken) => {
    setIsLoggedIn(true);
    setUserId(userId);
    setUserToken(userToken);
  };
  const logout = (userId, userToken) => {
    setIsLoggedIn(false);
    setUserId("");
    setUserToken("");
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        userId,
        userToken,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
