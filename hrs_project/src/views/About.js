import React, { useState, useEffect } from "react";
import { Row, Col, Card, Button, Modal, Form } from "react-bootstrap";
import "../views/css/about.css";

const About = () => {
  const [companies, setCompanies] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [editedCompany, setEditedCompany] = useState({
    name: "",
    taxCode: "",
    address: "",
    legalRepresentative: "",
  });

  useEffect(() => {
    fetch("http://localhost:9999/companiesInformation")
      .then((response) => response.json())
      .then((data) => {
        setCompanies(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleEdit = (company) => {
    setSelectedCompany(company);
    setEditedCompany({
      name: company.name,
      taxCode: company.taxCode,
      address: company.address,
      legalRepresentative: company.legalRepresentative,
    });
    setShowEditModal(true);
  };

  const handleEditSubmit = () => {
    // Send edited company data to server for update
    fetch(`http://localhost:9999/companiesInformation/${selectedCompany.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedCompany),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Edit Success:", data);
        // Update companies state with updated data
        const updatedCompanies = companies.map((company) =>
          company.id === selectedCompany.id ? data : company
        );
        setCompanies(updatedCompanies);
        handleCloseEditModal();
      })
      .catch((error) => {
        console.error("Edit Error:", error);
      });
  };

  const handleDelete = (company) => {
    setSelectedCompany(company);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    // Send request to delete company data
    fetch(`http://localhost:9999/companiesInformation/${selectedCompany.id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        console.log("Delete Success");
        // Remove deleted company from companies state
        const updatedCompanies = companies.filter(
          (company) => company.id !== selectedCompany.id
        );
        setCompanies(updatedCompanies);
        handleCloseDeleteModal();
      })
      .catch((error) => {
        console.error("Delete Error:", error);
      });
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedCompany(null);
    setEditedCompany({
      name: "",
      taxCode: "",
      address: "",
      legalRepresentative: "",
    });
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedCompany(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedCompany({ ...editedCompany, [name]: value });
  };

  return (
    <Row xs={1} md={2} lg={3} className="g-4">
      {companies.map((company) => (
        <Col key={company.id}>
          <Card className="h-100">
            <Card.Body>
              <Card.Title>
                <i className="bi bi-bell me-2"></i>
                About {company.name}
              </Card.Title>
              <Card.Text>
                <h2 className="mt-4">Welcome to HRM {company.name} </h2>
                <h5 className="mb-4">Tax Code: {company.taxCode}</h5>
                <h5 className="mb-4">Address: {company.address}</h5>
                <h5 className="mb-4">
                  Legal Representative: {company.legalRepresentative}
                </h5>
                <br />
                <Button
                  variant="outline-primary"
                  className="me-2"
                  onClick={() => handleEdit(company)}
                >
                  Edit
                </Button>
                <Button
                  variant="outline-danger"
                  onClick={() => handleDelete(company)}
                >
                  Delete
                </Button>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Company Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Company Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={editedCompany.name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Tax Code</Form.Label>
              <Form.Control
                type="text"
                name="taxCode"
                value={editedCompany.taxCode}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={editedCompany.address}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Legal Representative</Form.Label>
              <Form.Control
                type="text"
                name="legalRepresentative"
                value={editedCompany.legalRepresentative}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleEditSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Modal */}
      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Company</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete {selectedCompany?.name}?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirm}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Row>
  );
};

export default About;
