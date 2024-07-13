import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "../css/createacc.css";

const CreateAccount = (props) => {
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState("1");
  const [status, setStatus] = useState("active");
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    // Fetch departments
    fetch("http://localhost:9999/departments")
      .then((res) => res.json())
      .then((data) => setDepartments(data))
      .catch((error) => console.error("Error fetching departments:", error));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    // check if passwords match
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    //create current date
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString();
    // create account data object
    const accountData = {
      name,
      department,
      email,
      password,
      phoneNumber,
      role,
      status,
      dateOfStart: formattedDate,
    };

    // send POST request to create account
    fetch("http://localhost:9999/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(accountData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Success:", data);
        alert("Account created successfully!");
        // Clear form fields
        setName("");
        setDepartment("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setPhoneNumber("");
        setRole("1");
        setStatus("active");
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Error creating account!");
      });
  };

  return (
    <Container className="create-account">
      <h2 className="text-center mb-4">Create Account for Employee</h2>
      <form onSubmit={handleSubmit}>
        {/* Name */}
        <Row className="mb-3">
          <Col
            md={2}
            className="d-flex align-items-center justify-content-start"
          >
            <label className="form-label mb-0">
              <strong>
                Name <sup style={{ color: "red" }}>*</sup>
              </strong>
            </label>
          </Col>
          <Col md={10}>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Col>
        </Row>
        {/* Department */}
        <Row className="mb-3">
          <Col
            md={2}
            className="d-flex align-items-center justify-content-start"
          >
            <label className="form-label mb-0">
              <strong>
                Department <sup style={{ color: "red" }}>*</sup>
              </strong>
            </label>
          </Col>
          <Col md={10}>
            <select
              className="form-select"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              required
            >
              <option value="" disabled>
                Select Department
              </option>
              {departments.map((dep) => (
                <option key={dep.id} value={dep.id}>
                  {dep.name}
                </option>
              ))}
            </select>
          </Col>
        </Row>
        {/* Email */}
        <Row className="mb-3">
          <Col
            md={2}
            className="d-flex align-items-center justify-content-start"
          >
            <label className="form-label mb-0">
              <strong>
                Email <sup className="text-danger">*</sup>
              </strong>
            </label>
          </Col>
          <Col md={10}>
            <input
              type="email"
              className="form-control"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Col>
        </Row>
        {/* Password */}
        <Row className="mb-3">
          <Col
            md={2}
            className="d-flex align-items-center justify-content-start"
          >
            <label className="form-label mb-0">
              <strong>
                Password <sup className="text-danger">*</sup>
              </strong>
            </label>
          </Col>
          <Col md={10}>
            <input
              type="password"
              className="form-control"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Col>
        </Row>
        {/* Confirm Password */}
        <Row className="mb-3">
          <Col
            md={2}
            className="d-flex align-items-center justify-content-start"
          >
            <label className="form-label mb-0">
              <strong>
                Confirm Password <sup className="text-danger">*</sup>
              </strong>
            </label>
          </Col>
          <Col md={10}>
            <input
              type="password"
              className="form-control"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </Col>
        </Row>
        {/* Phone Number */}
        <Row className="mb-3">
          <Col
            md={2}
            className="d-flex align-items-center justify-content-start"
          >
            <label className="form-label mb-0">
              <strong>
                Phone Number <sup className="text-danger">*</sup>
              </strong>
            </label>
          </Col>
          <Col md={10}>
            <input
              type="tel"
              className="form-control"
              placeholder="Enter Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </Col>
        </Row>
        {/* Role */}
        <Row className="mb-3">
          <Col
            md={2}
            className="d-flex align-items-center justify-content-start"
          >
            <label className="form-label mb-0">
              <strong>
                Role <sup style={{ color: "red" }}>*</sup>
              </strong>
            </label>
          </Col>
          <Col md={10}>
            <select
              className="form-select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="" disabled>
                Select Role
              </option>
              <option value="1">Employee</option>
              <option value="2">Manager</option>
            </select>
          </Col>
        </Row>
        {/* Status */}
        <Row className="mb-3">
          <Col
            md={2}
            className="d-flex align-items-center justify-content-start"
          >
            <label className="form-label mb-0">
              <strong>
                Status <sup style={{ color: "red" }}>*</sup>
              </strong>
            </label>
          </Col>
          <Col md={10} className="d-flex justify-content-around">
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="status"
                id="statusActive"
                value="active"
                checked={status === "active"}
                onChange={() => setStatus("active")}
                required
              />
              <label className="form-check-label" htmlFor="statusActive">
                Active
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="status"
                id="statusInactive"
                value="inactive"
                checked={status === "inactive"}
                onChange={() => setStatus("inactive")}
                required
              />
              <label className="form-check-label" htmlFor="statusInactive">
                Inactive
              </label>
            </div>
          </Col>
        </Row>
        {/* Button Create Account */}
        <Row className="mb-3">
          <Col className="d-flex justify-content-center">
            <Button type="submit" className="btn btn-primary">
              Create Account
            </Button>
          </Col>
        </Row>
      </form>
    </Container>
  );
};

export default CreateAccount;
