import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./NavBar.scss";

const LoginAuth = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <button onClick={() => loginWithRedirect()} className="MyAccount">
      <span>Log in</span>
      <i className="fa-solid fa-user"></i>
    </button>
  );
};

export default LoginAuth;
