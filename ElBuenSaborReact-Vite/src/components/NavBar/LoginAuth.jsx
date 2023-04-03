import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import "./NavBar.scss"
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
library.add(faUser);

const LoginAuth = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <button onClick={() => loginWithRedirect()} className="MyAccount">
      <span>Log in</span>
      <FontAwesomeIcon icon={faUser} />
    </button>
  );
}

export default LoginAuth;
