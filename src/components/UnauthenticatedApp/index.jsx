import React from "react";
import { useAuth } from "../../hooks/useAuth";
import "./styles.css";

const UnauthenticatedApp = () => {
  const { login, loginFacebook } = useAuth();
  
  return (
    <>
      <h2>Log in to join a chat room!</h2>
      <div>
        <button onClick={login} className="login">
          Login with Google
        </button>
        {/* <button onClick={loginFacebook} className="login">
          Login with Facebook
        </button> */}
      </div>
    </>
  );
};

export default UnauthenticatedApp;
