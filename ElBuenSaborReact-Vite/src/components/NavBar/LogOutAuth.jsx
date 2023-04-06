import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
const LogOutAuth = () => {
  const { logout } = useAuth0();

  return (
    <span style={{ cursor: "pointer", width: "100%", display: "block", padding: "0 1rem" }} onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
      Log Out
    </span>
  );
}

export default LogOutAuth;
