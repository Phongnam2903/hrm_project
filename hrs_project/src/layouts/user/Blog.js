// Blog.js
import React from "react";
import { Card, Container, Row, Col, Button } from "react-bootstrap";

const blogPosts = [
  {
    id: 1,
    title: "Effective Recruitment Strategies",
    content:
      "Learn how to attract top talent with these proven recruitment strategies.",
    fullContent: "Full content of the blog post goes here...",
    image: "https://via.placeholder.com/150",
    category: "HR Best Practices",
    date: "July 1, 2024",
    likes: 0,
    comments: [],
  },
  {
    id: 2,
    title: "Effective Recruitment Strategies",
    content:
      "Learn how to attract top talent with these proven recruitment strategies.",
    fullContent: "Full content of the blog post goes here...",
    image: "https://via.placeholder.com/150",
    category: "HR Best Practices",
    date: "July 1, 2024",
    likes: 0,
    comments: [],
  },
  // Add more blog posts as needed
];

const Blog = ({ setCurrentView, setCurrentPostId }) => {
  const handleReadMore = (id) => {
    setCurrentPostId(id);
    setCurrentView("BlogDetail");
  };

  const handleCreateBlog = () => {
    setCurrentView("CreateBlog");
  };

  return (
    <Container className="mt-4">
      <h1>HRM Blog</h1>
      <Button className="mb-4" onClick={handleCreateBlog}>
        Create New Blog Post
      </Button>
      <Row>
        {blogPosts.map((post) => (
          <Col md={4} key={post.id}>
            <Card className="mb-4 shadow-sm">
              <Card.Img variant="top" src={post.image} />
              <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {post.category} - {post.date}
                </Card.Subtitle>
                <Card.Text>{post.content}</Card.Text>
                <button onClick={() => handleReadMore(post.id)}>
                  Read More
                </button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Blog;
