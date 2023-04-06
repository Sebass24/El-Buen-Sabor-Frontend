import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import "./NavBarAdmin.scss";
import LogOutAuth from './LogOutAuth';
import Profile from './Profile';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import LoginAuth from './LoginAuth';
import { Dropdown } from 'react-bootstrap';
library.add(faUser);

const AdminBar = () => {
  const { isAuthenticated } = useAuth0()
  return (
    <div className="navBar_Container_admin">
      <div className="Arow_container">
        <div className="arrowBottom">
          <div className="imgLogo"></div>
        </div>
      </div>
      {/* <div className="LogContainer">

            <LogOutAuth />
            <div className="MyAccount">
              <Profile />
              <FontAwesomeIcon icon={faUser} />
            </div>
          </div> */}
      <div className="Container_RightNavBar_admin">
        {isAuthenticated ?
          <Dropdown>
            <Dropdown.Toggle id="dropdown-basic" className='MyAccount'>

              <Profile />
              <FontAwesomeIcon icon={faUser} />

            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item ><LogOutAuth /></Dropdown.Item>

            </Dropdown.Menu>
          </Dropdown>

          :
          <LoginAuth />
        }
      </div>
      <h1 className='Title_admin'>Admin</h1>
    </div>
  );
}

export default AdminBar;
