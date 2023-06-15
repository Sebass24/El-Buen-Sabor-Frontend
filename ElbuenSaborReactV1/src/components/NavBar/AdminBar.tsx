import { User, useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import "./AdminBar.scss";
import LogOutAuth from './LogOutAuth';
import Profile from './Profile';
import LoginAuth from './LoginAuth';
import { Dropdown } from 'react-bootstrap';
import Logo from './Logo/Logo';
import { useAppSelector } from '@app/Hooks';
import { Link } from 'react-router-dom';
interface title {
  title: String;
}

const AdminBar: React.FC<title> = ({ title }) => {
  const { isAuthenticated } = useAuth0()
  const { user } = useAppSelector(state => state.users)

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

            <Dropdown.Menu className='dropdown_menu' >
              <Dropdown.Item ><LogOutAuth /></Dropdown.Item>
              {user.role?.description === "Administrador" ? (<>
                <Dropdown.Item ><Link to="/" className="link"><span>Home</span></Link></Dropdown.Item>
                <Dropdown.Item ><Link to="/cashier" className="link"><span>Cajero</span></Link></Dropdown.Item>
                <Dropdown.Item ><Link to="/cook" className="link"><span>Cocinero</span></Link></Dropdown.Item>
                <Dropdown.Item ><Link to="/delivery" className="link"><span>Delivery</span></Link></Dropdown.Item>
                <Dropdown.Item ><Link to="/admin" className="link"><span>Administrador</span></Link></Dropdown.Item>
              </>) : <></>}
              {user.role?.description === "Cocinero" ? (<>
                <Dropdown.Item ><Link to="/" className="link"><span>Home</span></Link></Dropdown.Item>
                <Dropdown.Item ><Link to="/cook" className="link"><span>Cocinero</span></Link></Dropdown.Item>
              </>
              ) : <></>}
              {user.role?.description === "Cajero" ? (<>
                <Dropdown.Item ><Link to="/" className="link"><span>Home</span></Link></Dropdown.Item>
                <Dropdown.Item ><Link to="/cashier" className="link"><span>Cajero</span></Link></Dropdown.Item>
              </>
              ) : <></>}
              {user.role?.description === "Delivery" ? (<>
                <Dropdown.Item ><Link to="/" className="link"><span>Home</span></Link></Dropdown.Item>
                <Dropdown.Item ><Link to="/delivery" className="link"><span>Delivery</span></Link></Dropdown.Item>
              </>
              ) : <></>}
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
