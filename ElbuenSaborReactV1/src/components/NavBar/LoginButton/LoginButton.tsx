
import LoginAuth from "../LoginAuth";
import { useAuth0 } from "@auth0/auth0-react";
import LogOutAuth from "../LogOutAuth";
import Profile from "../Profile";
import { Dropdown } from "react-bootstrap";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faUser } from "@fortawesome/free-regular-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./LoginButton.scss";
import { useState } from "react";
import PersonalDataModal from "components/Users/UsersPersonalData/PersonalDataModal";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "@app/Hooks";

library.add(faUser);

export const LoginButton = () => {
  const { isAuthenticated } = useAuth0();
  const [showPersonalData, setShowPersonalData] = useState(false);
  const { user } = useAppSelector(state => state.users)

  const handlePersonalDataModal = () => {
    setShowPersonalData(false);
  }

  const navigate = useNavigate();

  return (
    <div className="Container_RightNavBar">
      {isAuthenticated ?
        <Dropdown>
          <Dropdown.Toggle id="dropdown-basic" className='MyAccount' >
            <Profile />
            <FontAwesomeIcon icon={faUser} />
          </Dropdown.Toggle>
          <Dropdown.Menu className="login-button">
            <Dropdown.Item onClick={() => { setShowPersonalData(true) }}><span>Mis datos personales</span></Dropdown.Item>
            {user.role?.description === "Administrador" ? (<>
              <Dropdown.Item onClick={() => { navigate("/home") }}><span>Home</span></Dropdown.Item>
              <Dropdown.Item onClick={() => { navigate("/cashier") }}><span>Cajero</span></Dropdown.Item>
              <Dropdown.Item onClick={() => { navigate("/cook") }}><span>Cocinero</span></Dropdown.Item>
              <Dropdown.Item onClick={() => { navigate("/delivery") }}><span>Delivery</span></Dropdown.Item>
              <Dropdown.Item onClick={() => { navigate("/admin") }}><span>Administrador</span></Dropdown.Item>
            </>) : <></>}
            <Dropdown.Item><LogOutAuth /></Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        :
        <LoginAuth />}
      {showPersonalData ?
        <PersonalDataModal onClose={handlePersonalDataModal} /> : ""}
    </div>
  )
}