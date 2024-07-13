// Home.js
import React from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";

const Home = () => {
  return (
    <Container className="mt-4">
      <h1>Welcome to the Home Page</h1>
      <Row>
        <Col md={4}>
          <Card className="mb-4 shadow-sm">
            <Card.Img variant="top" src="https://via.placeholder.com/150" />
            <Card.Body>
              <Card.Title>Feature 1</Card.Title>
              <Card.Text>
                Brief description of Feature 1. Lorem ipsum dolor sit amet,
                consectetur adipiscing elit.
              </Card.Text>
              <Button variant="primary">Learn More</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-4 shadow-sm">
            <Card.Img variant="top" src="https://via.placeholder.com/150" />
            <Card.Body>
              <Card.Title>Feature 2</Card.Title>
              <Card.Text>
                Brief description of Feature 2. Lorem ipsum dolor sit amet,
                consectetur adipiscing elit.
              </Card.Text>
              <Button variant="primary">Learn More</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-4 shadow-sm">
            <Card.Img variant="top" src="https://via.placeholder.com/150" />
            <Card.Body>
              <Card.Title>Feature 3</Card.Title>
              <Card.Text>
                Brief description of Feature 3. Lorem ipsum dolor sit amet,
                consectetur adipiscing elit.
              </Card.Text>
              <Button variant="primary">Learn More</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
