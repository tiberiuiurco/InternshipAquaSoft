import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container } from 'react-bootstrap'

export const NavbOut = () => {
    return(<>
        <Navbar bg="dark" variant="dark">
          <Container>
          <Navbar.Brand href="/">AquaSoft Internship</Navbar.Brand>
          <Nav className="me-auto">
          </Nav>
          <Nav>
      <Nav.Link href="/login">Login</Nav.Link>
      <Nav.Link href="/register">Register</Nav.Link>
    </Nav>
          </Container>
        </Navbar>
      </>)
}
