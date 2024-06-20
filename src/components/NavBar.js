import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";
import { UserContext } from "../contexts/user.context";
import img1 from "../assets/logo.png";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';

function NavBar() {
  const [click, setClick] = useState(false);
  
  const { logOutUser } = useContext(UserContext);

  const logOut = async () => {
    await logOutUser();
    window.location.reload(true);
    return;
  }

  return (
    <>
      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary" data-bs-theme="dark">
      <Container>
        <Navbar.Brand as={NavLink} exact to="/" className="nav-logo"> <img src={img1} alt="logo" className="logo"/> </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} exact to="/listbook"> ListBook</Nav.Link>
            <Nav.Link as={NavLink} exact to="/userlistings">Your Listings</Nav.Link>
            <NavDropdown title="Profile Settings" id="collapsible-nav-dropdown">
              <NavDropdown.Item as={NavLink} exact to="/user">Your Profile</NavDropdown.Item>
              <NavDropdown.Item href="/history">History Transactions</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={NavLink} exact to="/" onClick={logOut}>
                SignOut
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link as={NavLink} exact to="/cart">Cart</Nav.Link>
            <Nav.Link as={NavLink} exact to="/" onClick={logOut}>
            <Button variant="outline-success">LogOut</Button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  );
}

export default NavBar;