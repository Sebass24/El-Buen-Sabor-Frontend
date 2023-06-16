import { useState, useEffect } from "react";
import "./NavBar.scss";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { Navbar, Nav, Container } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from "./Logo/Logo";
import ShoppingCartIcon from "./ShoppingCartIcon/ShoppingCartIcon";
import { LoginButton } from "./LoginButton/LoginButton";
import { Link } from "react-router-dom";


library.add(faUser);

export default function NavigationBar() {

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.matchMedia('(max-width: 767px)').matches);
    window.addEventListener('resize', handleResize);

    setIsSmallScreen(window.matchMedia('(max-width: 767px)').matches);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <Navbar collapseOnSelect expand="md" className="navbar-custom">
        <Container className="container-nav">
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav style={{ position: 'relative' }}>
              <Link to="/contactUs" className="link"><span className="nav-link">Contactanos</span></Link>
              <Link to="/" className="link"><span className="nav-link">Catálogo</span></Link>
              <Link to="/aboutUs" className="link"><span className="nav-link">Sobre nosotros</span></Link>
            </Nav>
            {isSmallScreen && <LoginButton />}
          </Navbar.Collapse>
        </Container>
        <Logo />
        {!isSmallScreen && <LoginButton />}
        <ShoppingCartIcon />
      </Navbar>
    </>

  );
}