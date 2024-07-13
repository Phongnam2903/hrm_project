import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Image,
  Row,
} from "react-bootstrap";
import "../views/css/Profile.css";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [editableUser, setEditableUser] = useState(null);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
      setUser(currentUser);
      setEditableUser(currentUser); // Initialize editable user state
    }
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setEditableUser({ ...editableUser, [id]: value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const response = await fetch(`http://localhost:9999/users/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editableUser),
    });

    if (response.ok) {
      const updatedUser = await response.json();
      setUser(updatedUser);
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
      alert("Profile updated successfully!");
    } else {
      alert("Failed to update profile.");
    }
  };

  if (!user || !editableUser) {
    return null; // Handle the case when user is not logged in
  }

  return (
    <Container className="profile-admin" fluid>
      <Row>
        <h1>Account Information</h1>
      </Row>
      <Row className="row">
        <Col sm={5} className="col-left">
          <Form className="mb-4">
            {/* Avatar */}
            <div className="avatar">
              <Image src={user.photo} roundedCircle />
              <h1>{user.name}</h1>
              <p>{user.position}</p>
            </div>
            {/* Access time */}
            <FormGroup className="mb-3" controlId="formBasicEmail">
              <Form.Label>
                <b>Access time : </b>
                <span>{user.accessCount}</span>
              </Form.Label>
            </FormGroup>
            {/* Date of Birth */}
            <FormGroup className="mb-3" controlId="Date of Birth">
              <Form.Label>
                <b>Date of Birth : </b>
                <span>{user.dateOfBirth}</span>
              </Form.Label>
            </FormGroup>
            {/* Status */}
            <FormGroup className="mb-3" controlId="status">
              <Form.Label>
                <b>Status :</b>
                <span>{user.status}</span>
              </Form.Label>
            </FormGroup>
          </Form>
        </Col>
        <Col sm={7} className="col-right">
          <Form onSubmit={handleUpdate}>
            {/* Select Image */}
            <Form.Group className="mb-3" controlId="photo">
              <Form.Label>
                <b>Select Image :</b>
              </Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => {
                  const file = e.target.files[0];
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setEditableUser({ ...editableUser, photo: reader.result });
                  };
                  reader.readAsDataURL(file);
                }}
              />
            </Form.Group>
            {/* StaffID */}
            <Form.Group className="mb-3" controlId="id">
              <Form.Label>
                <b>StaffID :</b>
              </Form.Label>
              <Form.Control type="text" value={editableUser.id} readOnly />
            </Form.Group>
            {/* Full Name */}
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>
                <b>Full Name : </b>
              </Form.Label>
              <Form.Control
                type="text"
                value={editableUser.name}
                onChange={handleInputChange}
              />
            </Form.Group>
            {/* Email */}
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>
                <b>Email : </b>
              </Form.Label>
              <Form.Control
                type="text"
                value={editableUser.email}
                onChange={handleInputChange}
              />
            </Form.Group>
            {/* Phone Number */}
            <Form.Group className="mb-3" controlId="phoneNumber">
              <Form.Label>
                <b>Phone Number :</b>
              </Form.Label>
              <Form.Control
                type="text"
                value={editableUser.phoneNumber}
                onChange={handleInputChange}
              />
            </Form.Group>
            {/* Date of Birth */}
            <Form.Group className="mb-3" controlId="dateOfBirth">
              <Form.Label>
                <b>Date of Birth :</b>
              </Form.Label>
              <Form.Control
                type="text"
                value={editableUser.dateOfBirth}
                onChange={handleInputChange}
              />
            </Form.Group>
            {/* Role */}
            <Form.Group className="mb-3" controlId="role">
              <Form.Label>
                <b>Role : {editableUser.role === 0 ? "Admin" : "User"}</b>
              </Form.Label>
            </Form.Group>
            {/* Update Button */}
            <Button variant="primary" type="submit">
              Update
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
