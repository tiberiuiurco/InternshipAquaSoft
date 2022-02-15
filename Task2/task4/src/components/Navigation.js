import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container } from 'react-bootstrap'

export const Navb = () => {
    return(<>
        <Navbar bg="dark" variant="dark">
          <Container>
          <Navbar.Brand href="/">AquaSoft Internship</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/employees">Employees</Nav.Link>
            <Nav.Link href="/projects">Projects</Nav.Link>
          </Nav>
          </Container>
        </Navbar>
      </>)
}
