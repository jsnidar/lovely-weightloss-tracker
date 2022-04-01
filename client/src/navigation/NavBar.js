import React from 'react';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';

const NavBar = ({ setCurrentUser, currentUser }) => {

  function handleLogoutClick() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setCurrentUser(null);
      }
    });
  }

  return (
      <Navbar className='navigation' bg='light' expand="lg" sticky="top">
        <Container>
          <Navbar.Brand href="/">
            {currentUser.name}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav>
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/goals/new">Create Goal</Nav.Link>
              <Nav.Link href="/check-ins/new">Add Check In</Nav.Link>
              <Button variant="outline-warning" onClick={handleLogoutClick}>
                Logout
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  )
}

export default NavBar;