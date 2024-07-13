import React, { useState } from "react";
import { Container, Row, Col, Button, ListGroup, Image, Card } from "react-bootstrap";


const NewsManagement = () => {
  const [selectedNews, setSelectedNews] = useState(null);

  const newsList = [
    {
      id: 1,
      title: "Company Activities",
      date: "2023-06-01",
      author: "Admin",
      content: "Details about company activities...",
      image: "https://via.placeholder.com/150"
    },
    {
      id: 2,
      title: "Team Building Program",
      date: "2023-06-05",
      author: "Admin",
      content: "Details about team building program...",
      image: "https://via.placeholder.com/150"
    }
  ];

  return (
    <Container fluid className="mt-3">
      <Row>
        <Col md={4}>
          <h3>News List</h3>
          <ListGroup>
            {newsList.map(news => (
              <ListGroup.Item 
                action 
                key={news.id} 
                onClick={() => setSelectedNews(news)}
                active={selectedNews && selectedNews.id === news.id}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <strong>{news.title}</strong> - {news.date} - {news.author}
                  </div>
                  <Button variant="info" size="sm">
                    View
                  </Button>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col md={8}>
          {selectedNews ? (
            <Card className="selected-news mt-3">
              <Card.Header as="h3">News Details</Card.Header>
              <Card.Body>
                <Row className="mb-3">
                  <Col md={4}>
                    <Image src={selectedNews.image} fluid />
                  </Col>
                  <Col md={8}>
                    <Card.Title>{selectedNews.title}</Card.Title>
                    <Card.Text><strong>Date:</strong> {selectedNews.date}</Card.Text>
                    <Card.Text><strong>Author:</strong> {selectedNews.author}</Card.Text>
                  </Col>
                </Row>
                <Card.Text>{selectedNews.content}</Card.Text>
              </Card.Body>
            </Card>
          ) : (
            <div className="no-selection mt-3">
              <h3>Select a news item to view details</h3>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default NewsManagement;
