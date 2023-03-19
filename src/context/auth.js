import React, { createContext, useState } from "react";
import { loginWithFacebook, loginWithGoogle } from "../services/firebase";

export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [user, setUser] = useState(null);

  const login = async () => {
    const user = await loginWithGoogle();

    if (!user) {
      // TODO: Handle failed login
      alert("Something went wrong.");
    }

    setUser(user);
  };

  const loginFacebook = async () => {
    const user = await loginWithFacebook();
    if (!user) {
      // TODO: Handle failed login
      alert("Something went wrong.");
    }

    setUser(user);
  };
  const value = { user, login, loginFacebook };

  return <AuthContext.Provider value={value} {...props} />;
};
