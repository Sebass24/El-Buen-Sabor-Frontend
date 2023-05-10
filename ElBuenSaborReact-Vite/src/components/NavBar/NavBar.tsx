import React, { useState } from "react";
import "./NavBar.scss";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { Navbar, Nav, Container } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from "./Logo/Logo";
import ShoppingCartIcon from "./ShoppingCartIcon/ShoppingCartIcon";
import LoginAuth from "./LoginAuth";
import { useAuth0 } from "@auth0/auth0-react";
import LogOutAuth from "./LogOutAuth";
//import Profile from "./Profile";
import { Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


library.add(faUser);

export default function NavigationBar() {
  const { isAuthenticated } = useAuth0();
  return (
    <>
      <Navbar collapseOnSelect expand="md" className="navbar-custom">
        <Container className="container-nav">
          <Navbar.Toggle aria-controls='responsive-navbar-nav'/>
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav style={{position: 'relative'}}>
              <Nav.Link href="/">Contactanos</Nav.Link>
              <Nav.Link href="/">Catálogo</Nav.Link>
              <Nav.Link href="/">Sobre nosotros</Nav.Link>
            </Nav>
            <div className="Container_RightNavBar">
              {isAuthenticated ?
                <Dropdown>
                  <Dropdown.Toggle id="dropdown-basic" className='MyAccount' >
                    {/* <Profile /> */}
                    <FontAwesomeIcon icon={faUser} />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item style={{ padding: "0" }} ><LogOutAuth /></Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                :
                <LoginAuth />
              }
            </div>
          </Navbar.Collapse>
        </Container>
        <Logo />
        <ShoppingCartIcon />
      </Navbar>
    </>

  );
}