
import LoginAuth from "../LoginAuth";
import { useAuth0 } from "@auth0/auth0-react";
import LogOutAuth from "../LogOutAuth";
import Profile from "../Profile";
import { Dropdown } from "react-bootstrap";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faUser } from "@fortawesome/free-regular-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./LoginButton.scss";
import { useEffect, useState } from "react";
import PersonalDataModal from "components/Users/UsersPersonalData/PersonalDataModal";
import { Link } from "react-router-dom";
import { useAppSelector } from "@app/Hooks";

library.add(faUser);

export const LoginButton = () => {
  const { isAuthenticated } = useAuth0();
  const [showPersonalData, setShowPersonalData] = useState(false);
  const { user } = useAppSelector(state => state.users)

  const handlePersonalDataModal = () => {
    setShowPersonalData(false);
  }

  return (
    <div className="Container_RightNavBar">
      {isAuthenticated ?
        <Dropdown>
          <Dropdown.Toggle id="dropdown-basic" className='MyAccount' >
            <Profile />
            <FontAwesomeIcon icon={faUser} />
          </Dropdown.Toggle>
          <Dropdown.Menu className="login-button">
            <Dropdown.Item onClick={() => { setShowPersonalData(true) }}>Mis datos personales</Dropdown.Item>
            {user.role?.description === "Administrador" ? (<>
              <Dropdown.Item ><Link to="/cashier" className="link"><span>Cajero</span></Link></Dropdown.Item>
              <Dropdown.Item ><Link to="/cook" className="link"><span>Cocinero</span></Link></Dropdown.Item>
              <Dropdown.Item ><Link to="/delivery" className="link"><span>Delivery</span></Link></Dropdown.Item>
              <Dropdown.Item ><Link to="/admin" className="link"><span>Administrador</span></Link></Dropdown.Item>
            </>) : <></>}
            {user.role?.description === "Cocinero" ? (
              <Dropdown.Item ><Link to="/cook" className="link"><span>Cocinero</span></Link></Dropdown.Item>
            ) : <></>}
            {user.role?.description === "Cajero" ? (
              <Dropdown.Item ><Link to="/cashier" className="link"><span>Cajero</span></Link></Dropdown.Item>
            ) : <></>}
            {user.role?.description === "Delivery" ? (
              <Dropdown.Item ><Link to="/delivery" className="link"><span>Delivery</span></Link></Dropdown.Item>
            ) : <></>}
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