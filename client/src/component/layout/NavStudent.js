import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import { useNavigate } from "react-router-dom";
const NavStudent = () => {

  const navigate = useNavigate();


  const logout = () => {

    sessionStorage.clear()
    localStorage.clear()
    navigate("/");
  };
  // console.log(user)
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/homeadmin" className="text-danger">
          Denso elearning Student
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/homeadmin">page1</Nav.Link>
            <Nav.Link href="/homeadmin">page2</Nav.Link>
            <Nav.Link href="/homeadmin">page3</Nav.Link>
            <Nav.Link href="/homeadmin">page4</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">

          <Navbar.Text
          className="text-danger">
            Signed in {sessionStorage.getItem("role")} as: 
</Navbar.Text>
            <NavDropdown title={sessionStorage.getItem("firstname")} id="navbarScrollingDropdown">
              <NavDropdown.Item onClick={logout}>logout</NavDropdown.Item>
            </NavDropdown>
          {/* <Nav.Link onClick={logout}>logout</Nav.Link> */}

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavStudent;
