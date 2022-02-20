import React, { useEffect, useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container } from 'react-bootstrap'

import { useStateIfMounted } from 'use-state-if-mounted'

export const NavbIn = (props) => {
    
    if(!props.userLogged){
      return(<>
        <Navbar bg="dark" variant="dark">
            <Container>
            <Navbar.Brand href="/">AquaSoft Internship</Navbar.Brand>
            <Nav className="me-auto">
            </Nav>
            <Nav>
            <Nav.Link href="/login">Login</Nav.Link>
      <Nav.Link href="/register">Register</Nav.Link>
      <Nav.Link href="/register">{props.userLogged}</Nav.Link>
      </Nav>
            </Container>
          </Navbar>
        </>
      )
    }
    else{
      return(<>
      {props.userLogged}
          <Navbar bg="dark" variant="dark">
            <Container>
            <Navbar.Brand href="/">AquaSoft Internship</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="/employees">Employees</Nav.Link>
              <Nav.Link href="/projects">Projects</Nav.Link>
            </Nav>
            <Nav>
        <Nav.Link href="/logout">Logout</Nav.Link>
        <Nav.Link>{localStorage.getItem('name')}</Nav.Link>
        <Nav.Link href="/register">{props.userLogged}</Nav.Link>
      </Nav>
            </Container>
          </Navbar>
        </>
        )
    }
}
