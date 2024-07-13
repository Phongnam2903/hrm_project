import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Modal,
  FormGroup,
} from "react-bootstrap";
import "../css/manageDepartment.css";
const ManageDepartment = () => {
  const [showModal, setShowModal] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [newDepartment, setNewDepartment] = useState({});
  const [users, setUsers] = useState([]);
  const [isEdit, setIsEdit] = useState(false);

  // fetch departments and users and store into state departments and users
  useEffect(() => {
    fetch("http://localhost:9999/departments")
      .then((res) => res.json())
      .then((results) => setDepartments(results))
      .catch((err) => console.log(err));
    fetch("http://localhost:9999/users")
      .then((res) => res.json())
      .then((u) => setUsers(u))
      .then((err) => console.log(err));
  }, []);

  // input new department
  const handleInputDepartment = (e) => {
    const { name, value } = e.target;
    setNewDepartment({ ...newDepartment, [name]: value });
  };

  // change manager
  const handleManagerChange = (e) => {
    setNewDepartment({ ...newDepartment, manager: e.target.value });
  };

  // create new department
  const handleCreateDepartment = (e) => {
    e.preventDefault();
    fetch("http://localhost:9999/departments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newDepartment),
    })
      .then((res) => res.json())
      .then((data) => {
        setDepartments([...departments, data]);
        setNewDepartment({});
      })
      .catch((err) => console.log(err));
  };

  const handleShowDetails = (department) => {
    setSelectedDepartment(department);
    setShowDetailModal(true);
  };

  const handleDeleteDepartment = (departmentId) => {
    fetch(`http://localhost:9999/departments/${departmentId}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          const updatedDepartments = departments.filter(
            (dept) => dept.id !== departmentId
          );
          setDepartments(updatedDepartments);
          console.log(
            `Department with ID ${departmentId} deleted successfully.`
          );
        } else {
          throw new Error("Failed to delete department.");
        }
      })
      .catch((err) => console.error("Error deleting department:", err));
  };

  const handleEditDepartment = (id, e) => {
    e.preventDefault();
    fetch(`http://localhost:9999/departments/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newDepartment),
    })
      .then((res) => res.json())
      .then((data) => {
        setDepartments(departments?.map((d) => (d.id == id ? data : d)));
        // Clear form input
        setNewDepartment({});
        setIsEdit(false);
        setShowModal(false);
      })
      .catch((err) => console.error("Error updating department:", err));
  };
  // find all manager
  const manager = users?.filter((u) => u.role === 2);
  // fine manager of department
  // Tìm tên của quản lý dựa trên departmentID
  const managerDepartment = (idManager) =>
    manager?.find((m) => m.id == idManager)?.name;
  return (
    <Container>
      {/* Model Create or Edit new department */}
      <Modal
        show={showModal}
        onHide={() => {
          setShowModal(false);
          setIsEdit(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {isEdit === false ? "Create New Department" : "Edit Department"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* form input information department */}
          <Form
            onSubmit={(e) => {
              if (isEdit === false) {
                handleCreateDepartment(e);
              } else {
                handleEditDepartment(newDepartment.id, e);
              }
            }}
          >
            {/* ID */}
            <FormGroup controlId="ID">
              <Form.Label>ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter ID department"
                value={newDepartment.id || ""}
                name="id"
                onChange={handleInputDepartment}
                required
              />
            </FormGroup>
            {/* name */}
            <FormGroup controlId="Name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter department name"
                value={newDepartment.name || ""}
                name="name"
                onChange={handleInputDepartment}
                required
              />
            </FormGroup>
            {/* description */}
            <FormGroup controlId="Description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                value={newDepartment.description || ""}
                name="description"
                onChange={handleInputDepartment}
                required
              />
            </FormGroup>
            {/* manager */}
            <Form.Group controlId="Manager">
              <Form.Label>Manager</Form.Label>
              {manager?.map((m) => (
                <Form.Check
                  key={m.id}
                  type="radio"
                  label={m.name}
                  name="manager"
                  value={m.id}
                  checked={m.id === newDepartment.manager}
                  onChange={handleManagerChange}
                  required
                />
              ))}
            </Form.Group>
            {/* button create */}
            <Button variant="primary" type="submit" className="mt-2">
              {isEdit === false ? "Create Department" : "Edit Department"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      {/* button create new department */}
      <Row className="mb-4">
        <Col>
          <h2>List Departments</h2>
        </Col>
        <Col className="text-right">
          <Button
            variant="primary"
            className="square-button"
            onClick={() => setShowModal(true)}
          >
            Create new Department
          </Button>
        </Col>
      </Row>
      {/* main */}
      <Row>
        {departments?.map((dept) => (
          <Col sm={6} md={4} lg={3} className="mb-4" key={dept.id}>
            <Card onClick={() => handleShowDetails(dept)}>
              <Card.Body>
                <Card.Title>{dept.name}</Card.Title>
                <Card.Text>{dept.description}</Card.Text>
                <Card.Text>
                  <strong>Manager:</strong> {managerDepartment(dept.manager)}
                </Card.Text>
              </Card.Body>
              {/* button delete and eidt */}
              <Row>
                <Col className="d-flex justify-content-center mb-3">
                  <Button
                    variant="outline-info"
                    onClick={(e) => {
                      e.stopPropagation();
                      setNewDepartment(dept);
                      setShowModal(true);
                      setIsEdit(true);
                    }}
                    style={{ width: "70%" }}
                  >
                    Edit
                  </Button>
                </Col>
                <Col className="d-flex justify-content-center mb-3">
                  <Button
                    variant="outline-danger"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent card click from triggering
                      handleDeleteDepartment(dept.id); // Assuming dept has an id field
                    }}
                    style={{ width: "70%" }}
                  >
                    Delete
                  </Button>
                </Col>
              </Row>
            </Card>
          </Col>
        ))}
      </Row>

      {selectedDepartment && (
        <Modal show={showDetailModal} onHide={() => setShowDetailModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Department Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>{selectedDepartment.name}</h4>
            <p>{selectedDepartment.description}</p>
            <p>
              <strong>Employees:</strong>
            </p>
            <ul>
              {Array.isArray(selectedDepartment.employees) &&
                selectedDepartment.employees.map((employee, index) => (
                  <li key={index}>{employee.name}</li>
                ))}
            </ul>
            <p>
              <strong>Manager:</strong> {selectedDepartment.manager}
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowDetailModal(false)}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  );
};

export default ManageDepartment;
