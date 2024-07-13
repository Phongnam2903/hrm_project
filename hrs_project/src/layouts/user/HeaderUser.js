import React from "react";
import {
  Button,
  Container,
  Form,
  Image,
  Nav,
  NavDropdown,
  Navbar,
} from "react-bootstrap";
import Logo from "../Logo";


export default function Header() {
  return (
    <Container fluid className="header">
      <Navbar expand="lg" className="navbar">
        <Container fluid className="image">
          <Navbar.Brand href="#" className="image-logo">
            <Logo />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" navbarScroll>
              <Nav.Link href="#">
                <i className="bi bi-house-heart-fill"> Home</i>
              </Nav.Link>
              <Nav.Link href="/user/payrolluser">
                <i className="bi bi-currency-dollar"> Payroll</i>
              </Nav.Link>
            </Nav>
            <Nav>
              <Form className="d-flex search-form mx-auto">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2 search-input"
                  aria-label="Search"
                />
                <Button variant="outline-light" className="search-button">
                  Search
                </Button>
              </Form>
            </Nav>
            <Nav>
              <NavDropdown
                title={
                  <div className="avatar-group">
                    <Image
                      src="./images/avt.jpg"
                      height="40px"
                      roundedCircle
                      className="avatar-image"
                      alt="error"
                    />
                    <b className="avatar-name">Staff</b>
                  </div>
                }
                id="navbarScrollingAvatar"
              >
                <NavDropdown.Item href="#profile">Profile</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#settings">Setting</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/login">Log out</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Container>
  );
}
