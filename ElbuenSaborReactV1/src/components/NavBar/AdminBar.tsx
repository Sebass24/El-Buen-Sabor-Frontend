import React from 'react';
import "./AdminBar.scss";
import Logo from './Logo/Logo';
import { LoginButton } from './LoginButton/LoginButton';
interface title {
  title: String;
}

const AdminBar: React.FC<title> = ({ title }) => {

  return (
    <div className="navBar_Container_admin">
      <Logo />
      <div className="Container_RightNavBar_admin">
        <LoginButton />
      </div>
      <h1 className='Title_admin'>{title}</h1>
    </div>
  );
}

export default AdminBar;
