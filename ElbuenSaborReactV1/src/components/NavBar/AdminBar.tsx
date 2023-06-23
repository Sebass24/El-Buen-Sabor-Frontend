import React from 'react';
import "./AdminBar.scss";
import NavigationBar from './Navbar';
interface title {
  title: String;
}

const AdminBar: React.FC<title> = ({ title }) => {

  return (
    <div>
      <NavigationBar />
      <div className="image-container"></div>
      <h1 className='Title_admin'>{title}</h1>
    </div>

  );
}

export default AdminBar;
