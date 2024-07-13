// BlogDetail.js
import React, { useState } from "react";
import { Container, Card, Form, Button, ListGroup } from "react-bootstrap";

const blogPosts = [
  {
    id: 1,
    title: "Effective Recruitment Strategies",
    fullContent: "Full content of the blog post goes here...",
    image: "https://via.placeholder.com/150",
    category: "HR Best Practices",
    date: "July 1, 2024",
    likes: 0,
    comments: [],
  },
  // Add more blog posts as needed
];

const BlogDetail = ({ currentPostId }) => {
  const post = blogPosts.find((post) => post.id === currentPostId);
  const [likes, setLikes] = useState(post ? post.likes : 0);
  const [comments, setComments] = useState(post ? post.comments : []);
  const [newComment, setNewComment] = useState("");

  const handleLike = () => {
    setLikes(likes + 1);
    post.likes = likes + 1; // Update the post's likes
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    const updatedComments = [...comments, newComment];
    setComments(updatedComments);
    setNewComment("");
    post.comments = updatedComments; // Update the post's comments
  };

  if (!post) return <div>Post not found</div>;

  return (
    <Container className="mt-4">
      <Card>
        <Card.Img variant="top" src={post.image} />
        <Card.Body>
          <Card.Title>{post.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {post.category} - {post.date}
          </Card.Subtitle>
          <Card.Text>{post.fullContent}</Card.Text>
          <Button onClick={handleLike}>Like ({likes})</Button>
        </Card.Body>
      </Card>
      <hr />
      <h3>Comments</h3>
      <ListGroup>
        {comments.map((comment, index) => (
          <ListGroup.Item key={index}>{comment}</ListGroup.Item>
        ))}
      </ListGroup>
      <Form onSubmit={handleCommentSubmit} className="mt-3">
        <Form.Group controlId="comment">
          <Form.Label>Leave a Comment</Form.Label>
          <Form.Control
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
        </Form.Group>
        <Button type="submit" className="mt-2">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default BlogDetail;
