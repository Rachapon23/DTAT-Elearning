import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import { useNavigate } from "react-router-dom";

const NavAdmin = () => {

    const navigate = useNavigate();


    const logout = () => {
      sessionStorage.clear()
      localStorage.clear()
        navigate("/");
      };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/homeadmin" className="text-danger">
          Denso elearning Admin
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/homeadmin">หน้าแรก</Nav.Link>
            <Nav.Link href="/homeadmin/listalluser">สมาชิกทั้งหมด</Nav.Link>
            <Nav.Link href="/homeadmin">จัดการแอดมิน</Nav.Link>
            <Nav.Link href="/homeadmin/listteacheruser">จัดการผู้สอน</Nav.Link>
            <Nav.Link href="/homeadmin/lisstudentuser">จัดการผู้เรียน</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">

          <Navbar.Text className="text-danger">
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

export default NavAdmin;
