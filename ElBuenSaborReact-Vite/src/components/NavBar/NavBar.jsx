import React from "react";
import "./NavBar.scss";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LoginAuth from "./LoginAuth";
import { useAuth0 } from "@auth0/auth0-react";
import LogOutAuth from "./LogOutAuth";
import Profile from "./Profile";
import { Dropdown } from "react-bootstrap";

library.add(faCartShopping, faUser);

export default function NavBar() {
  const { isAuthenticated } = useAuth0()
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
          <LoginAuth />
        }

        {/* <div className="MyAccount">
          <span>My account</span>
          <FontAwesomeIcon icon={faUser} />
        </div> */}
        <FontAwesomeIcon icon={faCartShopping} className="shoppingCart" />
      </div>
    </div>
  );
}
