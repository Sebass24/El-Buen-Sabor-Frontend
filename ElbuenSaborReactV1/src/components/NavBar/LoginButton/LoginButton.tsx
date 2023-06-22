
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
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@app/Hooks";

library.add(faUser);

interface Props {
  onClick: () => void;
}

export const LoginButton = ({ onClick }: Props) => {
  const { isAuthenticated } = useAuth0();
  /*  const [showPersonalData, setShowPersonalData] = useState(false); */
  const { user } = useAppSelector(state => state.users);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const navigate = useNavigate();

  /*  const handlePersonalDataModal = () => {
     setShowPersonalData(false);
   } */
  const handlePersonalDataClick = () => {
    navigate("/myPersonalData");/* 
    setShowPersonalData(true); */
    onClick();
  }

  const handleMyOrders = () => {
    navigate("/myOrders");
    onClick();
  }

  const handleHome = () => {
    navigate("/");
    onClick();
  }

  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.matchMedia('(max-width: 767px)').matches);
    window.addEventListener('resize', handleResize);

    setIsSmallScreen(window.matchMedia('(max-width: 767px)').matches);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    onClick();
  }, [user])

  return (
    <>
      <div className="Container_RightNavBar">
        {!isAuthenticated ?
          <LoginAuth /> :
          isSmallScreen ?
            <>
              <hr />
              <Profile />
              <label><strong>Menú</strong></label>
              <Dropdown.Item onClick={handlePersonalDataClick}><span>Mis datos personales</span></Dropdown.Item>
              {user.role?.description === "Administrador" ? (<>
                <Dropdown.Item onClick={handleMyOrders}><span>Mis pedidos</span></Dropdown.Item>
                <Dropdown.Item onClick={handleHome}><span>Home</span></Dropdown.Item>
                <Dropdown.Item onClick={() => { navigate("/cashier") }}><span>Cajero</span></Dropdown.Item>
                <Dropdown.Item onClick={() => { navigate("/cook") }}><span>Cocinero</span></Dropdown.Item>
                <Dropdown.Item onClick={() => { navigate("/delivery") }}><span>Delivery</span></Dropdown.Item>
                <Dropdown.Item onClick={() => { navigate("/admin") }}><span>Administrador</span></Dropdown.Item>
              </>) : <></>}
              {user.role?.description === "Cliente" ? (<>
                <Dropdown.Item onClick={() => { navigate("/myOrders") }}><span>Mis pedidos</span></Dropdown.Item>
              </>) : <></>}
              <Dropdown.Item><LogOutAuth /></Dropdown.Item>

            </>
            :
            <Dropdown>
              <Dropdown.Toggle id="dropdown-basic" className='MyAccount' >
                <Profile />
                <FontAwesomeIcon icon={faUser} />
              </Dropdown.Toggle>
              <Dropdown.Menu className="login-button">
                <Dropdown.Item onClick={handlePersonalDataClick}><span>Mis datos personales</span></Dropdown.Item>
                {user.role?.description === "Administrador" ? (<>
                  <Dropdown.Item onClick={() => { navigate("/myOrders") }}><span>Mis pedidos</span></Dropdown.Item>
                  <Dropdown.Item onClick={() => { navigate("/") }}><span>Home</span></Dropdown.Item>
                  <Dropdown.Item onClick={() => { navigate("/cashier") }}><span>Cajero</span></Dropdown.Item>
                  <Dropdown.Item onClick={() => { navigate("/cook") }}><span>Cocinero</span></Dropdown.Item>
                  <Dropdown.Item onClick={() => { navigate("/delivery") }}><span>Delivery</span></Dropdown.Item>
                  <Dropdown.Item onClick={() => { navigate("/admin") }}><span>Administrador</span></Dropdown.Item>
                </>) : <></>}
                {user.role?.description === "Cliente" ? (<>
                  <Dropdown.Item onClick={() => { navigate("/myOrders") }}><span>Mis pedidos</span></Dropdown.Item>
                </>) : <></>}
                <Dropdown.Item><LogOutAuth /></Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
        }
      </div>
    </>
  )
}