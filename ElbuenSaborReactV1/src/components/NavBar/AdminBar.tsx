import { User, useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import "./AdminBar.scss";
import LogOutAuth from './LogOutAuth';
import Profile from './Profile';
import LoginAuth from './LoginAuth';
import { Dropdown } from 'react-bootstrap';
import Logo from './Logo/Logo';
interface title {
  title: String;
}

const AdminBar: React.FC<title> = ({ title }) => {
  const { isAuthenticated } = useAuth0()

  return (
    <div className="navBar_Container_admin">
      <Logo />
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
