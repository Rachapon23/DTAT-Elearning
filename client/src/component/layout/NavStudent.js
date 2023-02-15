import React from "react";
// import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import './Nav.css'

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
    <Navbar className="bg-nav" expand="lg">
      <Container>

        <Navbar.Brand href="/student/home" className="text-white">
          Denso elearning Student
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
<<<<<<< HEAD
          {/* <Nav.Link className="text-white" href="/student/home">หน้าแรก</Nav.Link> */}
            {/* <Nav.Link className="text-white" href="/student/list-courses">คอร์สของฉัน</Nav.Link> */}
=======
            {/* <Nav.Link className="text-white" href="/student/home">หน้าแรก</Nav.Link> */}
            <Nav.Link className="text-white" href="/student/list-courses">คอร์สของฉัน</Nav.Link>
>>>>>>> 1556c0df6a78f5f6bfa63a33b8bbe3e75b77d216
            {/* <Nav.Link href="/student/get-course/:id">/student/get-course/:id</Nav.Link> */}
          </Nav>
        </Navbar.Collapse>

        <Navbar.Collapse className="justify-content-end">
<<<<<<< HEAD
          <Navbar.Text
          className="text-white">
            Signed in {sessionStorage.getItem("role")} as: 
          </Navbar.Text>
            <NavDropdown  title={sessionStorage.getItem("firstname")} id="navbarScrollingDropdown">
              <NavDropdown.Item onClick={logout}>logout</NavDropdown.Item>
            </NavDropdown>
=======
          <Navbar.Text>
            Signed in {sessionStorage.getItem("role")} as:
          </Navbar.Text>
          <NavDropdown title={sessionStorage.getItem("firstname")} id="navbarScrollingDropdown">
            <NavDropdown.Item onClick={logout}>logout</NavDropdown.Item>
          </NavDropdown>
>>>>>>> 1556c0df6a78f5f6bfa63a33b8bbe3e75b77d216
          {/* <Nav.Link onClick={logout}>logout</Nav.Link> */}
        </Navbar.Collapse>
<<<<<<< HEAD
      {/* </Container> */}
=======

      </Container>

>>>>>>> 1556c0df6a78f5f6bfa63a33b8bbe3e75b77d216
    </Navbar>
  );
};

export default NavStudent;
