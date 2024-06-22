import React from 'react'
import { Container,Navbar,Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import '../styles/Langingpage.css'


function Landingpage() {
  return (
    <div className="home-container">
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#">Cofficana</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav ">
            <Nav className="ms-auto ">
              <Nav.Link  as={Link} to="/login">Login</Nav.Link>
              <Nav.Link as={Link} to="/register">Register</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className="content">
        <h1 className="text-center mb-4">Welcome to our Website</h1>
        <p className="lead text-center mb-4">Thank you for visiting! Please login or register to access our services.</p>
        <div className="d-flex justify-content-center">
          <Link to="/login" className="btn btn-dark me-4 ">Login</Link>
          <Link to="/register" className="btn btn-secondary ">Register</Link>
        </div>
      </Container>
    </div>
  )
}

export default Landingpage