import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import "./AdminBar.scss";
import LogOutAuth from './LogOutAuth';
import Profile from './Profile';
import LoginAuth from './LoginAuth';
import { Dropdown } from 'react-bootstrap';
interface title {
  title: String;
}

const AdminBar: React.FC<title> = ({ title }) => {
  const { isAuthenticated } = useAuth0()
  return (
    <div className="navBar_Container_admin">
      <div className="Arow_container_admin">
        <div className="arrowBottom_admin">
          <div className="imgLogo_admin"></div>
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
              <i className="fa-solid fa-user"></i>

            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item ><LogOutAuth /></Dropdown.Item>

            </Dropdown.Menu>
          </Dropdown>

          :
          <LoginAuth />
        }
      </div>
      <h1 className='Title_admin'>{title}</h1>
    </div>
  );
}

export default AdminBar;
