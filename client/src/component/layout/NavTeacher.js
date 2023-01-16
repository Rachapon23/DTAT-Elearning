import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import { useNavigate } from "react-router-dom";

const NavTeacher = () => {

  const navigate = useNavigate();


  const logout = () => {

    sessionStorage.clear()
    localStorage.clear()
    navigate("/");
  };
  // console.log(user.firstname)
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/homeadmin" className="text-danger">
          Denso elearning Teacher
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/hometeacher">สร้างบทเรียน</Nav.Link>
            <Nav.Link href="/hometeacher/quiz">สร้างแบบทดสอบ</Nav.Link>
            <Nav.Link href="/hometeacher">page3</Nav.Link>
            <Nav.Link href="/hometeacher">page4</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">

          <Navbar.Text
          className="text-danger">
            Signed in Teacher as: 
</Navbar.Text>
            <NavDropdown title={sessionStorage.getItem("firstname")} id="navbarScrollingDropdown">
              <NavDropdown.Item onClick={logout}>logout</NavDropdown.Item>
            </NavDropdown>
          {/* <Nav.Link onClick={logout}>logout</Nav.Link> */}

        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavTeacher