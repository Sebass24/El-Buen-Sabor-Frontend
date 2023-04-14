import React from "react";
import "./NavBar.scss";
import LoginAuth from "./LoginAuth";
import { useAuth0 } from "@auth0/auth0-react";
import LogOutAuth from "./LogOutAuth";
import Profile from "./Profile";
import { Dropdown } from "react-bootstrap";

export default function NavBar() {
  const { isAuthenticated } = useAuth0();
  return (
    <div className="navBar_Container">
      <div>
        <ul className="navBar_List">
          <li>conctact us</li>
          <li>catalogue</li>
          <li>about us </li>
        </ul>
      </div>

      <div className="Arow_container">
        <div className="arrowBottom">
          <div className="imgLogo"></div>
        </div>
      </div>

      <div className="Container_RightNavBar">
        {isAuthenticated ? (
          <Dropdown>
            <Dropdown.Toggle id="dropdown-basic" className="MyAccount">
              <Profile></Profile>
              <i className="fa-solid fa-user"></i>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item style={{ padding: "0" }}>
                <LogOutAuth />
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        ) : (
          <LoginAuth />
        )}

        {/* <div className="MyAccount">
          <span>My account</span>
          <FontAwesomeIcon icon={faUser} />
        </div> */}
        <i className="fa-solid fa-cart-shopping"></i>
      </div>
    </div>
  );
}
