
import LoginAuth from "./LoginAuth";
import { useAuth0 } from "@auth0/auth0-react";
import LogOutAuth from "./LogOutAuth";
import Profile from "./Profile";
import { Dropdown } from "react-bootstrap";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faUser } from "@fortawesome/free-regular-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./LoginButton.scss";

library.add(faUser);

export const LoginButton = () => {
    const { isAuthenticated } = useAuth0();
    return (
        <div className="Container_RightNavBar">
            {isAuthenticated ?
                <Dropdown>
                    <Dropdown.Toggle id="dropdown-basic" className='MyAccount' >
                        <Profile />
                        <FontAwesomeIcon icon={faUser} />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item style={{ padding: "0" }} ><LogOutAuth /></Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                :
                <LoginAuth />}
        </div>
    )
}