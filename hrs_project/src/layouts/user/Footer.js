import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../user/css/Footer.css";

const Footer = () => {
  return (
    <footer className="footer bg-light mt-auto py-3">
      <Container fluid className="footer-container">
        <Row>
          <Col md={4}>
            <h5>About Us</h5>
            <p>
              Our company provides world-class human resource management
              solutions, helping your business operate efficiently and flexibly.
            </p>
          </Col>
          <Col md={4}></Col>
          <Col md={4} className="right-align">
            <h5>Useful Links</h5>
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/about">About Us</a>
              </li>
              <li>
                <a href="/contact">Contact</a>
              </li>
            </ul>
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            <p className="mb-0">© 2024 - Your Company. All rights reserved.</p>
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            <p className="mb-0">Address: 123 ABC Street, District 1, HCMC</p>
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            <p className="mb-0">
              Email: info@yourcompany.com | Phone: (028) 1234 5678
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
