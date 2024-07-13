import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardImg,
  CardSubtitle,
  CardText,
  CardTitle,
  Button,
} from "reactstrap";
import "./css/blog.css";
const Blog = (props) => {
  const [likes, setLikes] = useState(props.likes);
  const [readMore, setReadMore] = useState(false);
  const [author, setAuthor] = useState(null); // State to store author info

  useEffect(() => {
    // Example fetch to get author information
    fetch(`http://localhost:9999/authors/${props.authorId}`)
      .then((res) => res.json())
      .then((result) => {
        setAuthor(result);
      })
      .catch((err) => console.log(err));
  }, [props.authorId]);

  const handleLike = () => {
    setLikes(likes + 1);
  };

  const toggleReadMore = () => {
    setReadMore(!readMore);
  };

  return (
    <Card className="blog-card">
      <CardImg alt="Card image cap" src={props.image} />
      <CardBody className="p-4">
        <CardTitle tag="h5">{props.title}</CardTitle>
        {author && <CardSubtitle>Written by {author.name}</CardSubtitle>}
        <CardText className="mt-3">
          {readMore ? props.content : `${props.content.substring(0, 100)}...`}
        </CardText>
        <Button color={props.color} onClick={toggleReadMore}>
          {readMore ? "Show Less" : "Read More"}
        </Button>
        <div className="mt-3">
          <Button color="primary" onClick={handleLike}>
            Like ({likes})
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};

export default Blog;
