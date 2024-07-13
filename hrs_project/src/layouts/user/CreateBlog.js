// CreateBlog.js
import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";

const categories = [
  "Recruitment",
  "Employee Engagement",
  "Training and Development",
  "HR Best Practices",
];

const CreateBlog = ({ setCurrentView, addBlogPost }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState(categories[0]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      id: Date.now(),
      title,
      content,
      fullContent: content,
      image,
      category,
      date: new Date().toLocaleDateString(),
      likes: 0,
      comments: [],
    };
    addBlogPost(newPost);
    setCurrentView("Blog");
  };

  return (
    <Container className="mt-4">
      <h1>Create New Blog Post</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="content">
          <Form.Label>Content</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="image">
          <Form.Label>Image</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />
          {image && (
            <img
              src={image}
              alt="Uploaded"
              style={{ marginTop: "10px", maxHeight: "200px" }}
            />
          )}
        </Form.Group>
        <Form.Group controlId="category">
          <Form.Label>Category</Form.Label>
          <Form.Control
            as="select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Button type="submit" className="mt-3">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default CreateBlog;
