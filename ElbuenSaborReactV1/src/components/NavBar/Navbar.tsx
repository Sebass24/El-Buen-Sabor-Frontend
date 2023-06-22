import { useState, useEffect, useRef } from "react";
import "./NavBar.scss";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { Navbar, Nav, Container } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from "./Logo/Logo";
import ShoppingCartIcon from "./ShoppingCartIcon/ShoppingCartIcon";
import { LoginButton } from "./LoginButton/LoginButton";
import { Link } from "react-router-dom";
import { useAppSelector } from "@app/Hooks";


library.add(faUser);

export default function NavigationBar() {

  const { user } = useAppSelector(state => state.users)
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.matchMedia('(max-width: 767px)').matches);
    window.addEventListener('resize', handleResize);

    setIsSmallScreen(window.matchMedia('(max-width: 767px)').matches);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleCloseNavBar = () => {
    setExpanded(false);
  };

  return (
    <>
      <Navbar collapseOnSelect expand="md" className="navbar-custom" expanded={expanded}>
        <Container className="container-nav">
          <Navbar.Toggle aria-controls='responsive-navbar-nav' onClick={() => setExpanded(!expanded)} />
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav style={{ position: 'relative' }}>
              {user.role?.id === 2 || !user.role || user.role?.id === 1 ?
                <>
                  <Link to="/contactUs" className="link-nav"><span className="nav-link">Contactanos</span></Link>
                  <Link to="/" className="link-nav"><span className="nav-link">Catálogo</span></Link>
                  <Link to="/aboutUs" className="link-nav"><span className="nav-link">Sobre nosotros</span></Link>
                </> : <></>}
              {isSmallScreen && <LoginButton onClick={handleCloseNavBar} />}
            </Nav>
          </Navbar.Collapse>
        </Container>
        <Logo />
        {!isSmallScreen && <LoginButton onClick={handleCloseNavBar} />}
        {user.role?.id === 2 || !user.role || user.role?.id === 1 ?
          <ShoppingCartIcon /> : <></>
        }
      </Navbar>
    </>

  );
}