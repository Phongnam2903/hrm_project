import React, { useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Background from "../../assets/images/bglogin/background.png";
import logo from "../../assets/images/logos/hrm1.jpg";
import "../Auth/css/Login.css";

const Login = () => {
  const [users, setUsers] = useState([]);
  const [inputUsername, setInputUsername] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Tải dữ liệu từ server
  useEffect(() => {
    fetch("http://localhost:9999/users")
      .then((res) => res.json())
      .then((results) => {
        setUsers(results);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    await delay(500);

    //Login
    const user = users.find(
      (u) => u.email === inputUsername && u.password === inputPassword
    );

    if (user) {
      // Lưu thông tin người dùng vào localStorage
      localStorage.setItem("currentUser", JSON.stringify(user));
      // Chuyển hướng dựa trên role
      if (user.role === 0) {
        navigate("/admin");
      } else if (
        (user.role === 1 || user.role === 2) &&
        user.status === "active"
      ) {
        navigate("/user");
      }
    } else {
      setShow(true);
    }
    setLoading(false);
  };

  const handlePassword = () => {};

  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  return (
    <div
      className="sign-in__wrapper"
      style={{
        backgroundImage: `url(${Background})`,
      }}
    >
      {/* Overlay */}
      <div className="sign-in__backdrop"></div>
      {/* Form */}
      <Form className="shadow p-4 bg-white rounded" onSubmit={handleSubmit}>
        {/* Header */}
        <img
          className="img-thumbnail mx-auto d-block mb-2"
          src={logo}
          alt="logo"
        />
        <div className="h4 mb-2 text-center">Login</div>
        {/* Alert */}
        {show && (
          <Alert
            className="mb-2"
            variant="danger"
            onClose={() => setShow(false)}
            dismissible
          >
            Incorrect username or password.
          </Alert>
        )}
        <Form.Group className="mb-2" controlId="username">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            value={inputUsername}
            placeholder="Email"
            onChange={(e) => setInputUsername(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={inputPassword}
            placeholder="Password"
            onChange={(e) => setInputPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group
          className="mb-3 d-flex justify-content-between align-items-center"
          controlId="checkbox"
        >
          <Form.Check type="checkbox" label="Remember me" />
          <Button
            className="text-muted p-0"
            variant="link"
            onClick={handlePassword}
            onClick={() => navigate("/forgotpass")}
          >
            Forgot password?
          </Button>
        </Form.Group>
        {!loading ? (
          <Button className="w-100" variant="primary" type="submit">
            Log In
          </Button>
        ) : (
          <Button className="w-100" variant="primary" type="submit" disabled>
            Logging In...
          </Button>
        )}
      </Form>
      {/* Footer */}
      <div className="w-100 mb-2 position-absolute bottom-0 start-50 translate-middle-x text-white text-center">
        Made by HRM
      </div>
    </div>
  );
};

export default Login;
