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
        <Navbar.Brand href="/hometeacher" className="text-danger">
          Denso elearning Teacher
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/create_course_teacher">สร้างบทเรียน</Nav.Link>
            <Nav.Link href="/courses_student">คอร์สทั้งหมด</Nav.Link>
            <Nav.Link href="/teacher/quiz">สร้างแบบทดสอบ</Nav.Link>
            <Nav.Link href="/teacher/test">ทำแบบทดสอบ</Nav.Link>
            <Nav.Link href="/teacher/score">ทำคะแนน</Nav.Link>
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
  )
}

export default NavTeacher