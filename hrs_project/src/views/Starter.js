import { Col, Row } from "reactstrap";
import SalesChart from "../components/dashboard/SalesChart";
import Blog from "../components/dashboard/Blog";
import { useEffect, useState } from "react";

const Starter = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9999/blogs")
      .then((res) => res.json())
      .then((result) => {
        setBlogs(result);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      {/*** Sales Chart ***/}
      <Row>
        <Col sm="12" lg="12" xl="12" xxl="12">
          <SalesChart />
        </Col>
      </Row>
      {/*** Blog Cards ***/}
      <Row>
        <h3 style={{ color: "#234a6c" }}>View Blog</h3>
        {blogs.map((blog) => (
          <Col sm="6" lg="6" xl="3" key={blog.id}>
            <Blog
              image={blog.image}
              title={blog.title}
              content={blog.content}
              subtitle={blog.category}
              createdAt={blog.createdAt}
              likes={blog.likes}
              comments={blog.comments}
              color="primary"
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Starter;
