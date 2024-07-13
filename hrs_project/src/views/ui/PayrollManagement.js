import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  ListGroup,
  Button,
  Card,
  Modal,
} from "react-bootstrap";

const PayrollManagement = () => {
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [payrolls, setPayrolls] = useState([]);
  const [action, setAction] = useState(""); // Để theo dõi hành động là approve hay reject

  useEffect(() => {
    fetch("http://localhost:9999/payrollDepartments")
      .then((res) => res.json())
      .then((results) => setPayrolls(results))
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleSelectDepartment = (department) => {
    setSelectedDepartment(department);
  };

  const handleApprove = () => {
    const updatedDepartment = {
      ...selectedDepartment,
      status: "Approved",
    };
    updateDepartmentStatus(updatedDepartment);
  };

  const handleReject = () => {
    const updatedDepartment = {
      ...selectedDepartment,
      status: "Rejected",
    };
    updateDepartmentStatus(updatedDepartment);
  };

  const updateDepartmentStatus = (updatedDepartment) => {
    fetch(`http://localhost:9999/payrollDepartments/${updatedDepartment.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedDepartment),
    })
      .then((res) => res.json())
      .then((data) => {
        setPayrolls(
          payrolls.map((payroll) =>
            payroll.id === updatedDepartment.id ? data : payroll
          )
        );
        setSelectedDepartment(data);
        setShowModal(false);
      })
      .catch((error) => {
        console.error("Error updating department:", error);
      });
  };

  const handleShowModal = (action) => {
    setAction(action);
    setShowModal(true);
  };

  const handleConfirmAction = () => {
    if (action === "approve") {
      handleApprove();
    } else if (action === "reject") {
      handleReject();
    }
  };

  return (
    <Container fluid className="mt-3">
      <Row>
        <Col md={4}>
          <h3>Departments</h3>
          <ListGroup>
            {payrolls.map((payroll, index) => (
              <ListGroup.Item
                key={index}
                action
                onClick={() => handleSelectDepartment(payroll)}
                active={
                  selectedDepartment &&
                  selectedDepartment.department === payroll.department
                }
              >
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <strong>{payroll.department}</strong> - {payroll.month}
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
          {selectedDepartment ? (
            <Card className="selected-payroll mt-3">
              <Card.Header as="h3">Payroll Details</Card.Header>
              <Card.Body>
                <Card.Title>{selectedDepartment.department}</Card.Title>
                <Card.Text>
                  <strong>Month:</strong> {selectedDepartment.month}
                </Card.Text>
                <Card.Text>
                  <strong>Total Amount:</strong>{" "}
                  {selectedDepartment.totalAmount}
                </Card.Text>
                <Card.Text>
                  <strong>Status:</strong> {selectedDepartment.status}
                </Card.Text>
                <h4>Employees</h4>
                <ListGroup>
                  {selectedDepartment.employees.map((employee, index) => (
                    <ListGroup.Item key={index}>
                      {employee.name} - {employee.salary}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
                <div className="mt-3 d-flex justify-content-end">
                  {selectedDepartment.status !== "Approved" && (
                    <Button
                      variant="success"
                      className="mr-2"
                      onClick={() => handleShowModal("approve")}
                    >
                      Approve
                    </Button>
                  )}
                  {selectedDepartment.status !== "Rejected" && (
                    <Button
                      variant="danger"
                      onClick={() => handleShowModal("reject")}
                    >
                      Reject
                    </Button>
                  )}
                </div>
              </Card.Body>
            </Card>
          ) : (
            <div className="no-selection mt-3">
              <h3>Select a department to view payroll details</h3>
            </div>
          )}
        </Col>
      </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Action</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ color: "black" }}>
          Are you sure you want to {action} the payroll for{" "}
          {selectedDepartment?.department}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="success" onClick={handleConfirmAction}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default PayrollManagement;
