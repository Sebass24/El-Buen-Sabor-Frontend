import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
const LogOutAuth = () => {
  const { logout } = useAuth0();

  return (
    <button style={{ cursor: "pointer" }} onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
      Log Out
    </button>
  );
}

export default LogOutAuth;
