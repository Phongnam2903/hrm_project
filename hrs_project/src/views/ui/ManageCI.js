import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import "../css/ManageCI.css";

function ManagerCompanyInformation() {
  const [companyInfo, setCompanyInfo] = useState({
    name: "",
    taxCode: "",
    address: "",
    legalRepresentative: "",
  });
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // State để hiển thị thông báo thành công

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompanyInfo({ ...companyInfo, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send companyInfo data to server
    fetch("http://localhost:9999/companiesInformation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(companyInfo),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
        // Reset form after successful submission
        setCompanyInfo({
          name: "",
          taxCode: "",
          address: "",
          legalRepresentative: "",
        });
        setShowSuccessMessage(true); // Hiển thị thông báo thành công
        setTimeout(() => setShowSuccessMessage(false), 3000); // Ẩn thông báo sau 3 giây
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleReset = () => {
    setCompanyInfo({
      name: "",
      taxCode: "",
      address: "",
      legalRepresentative: "",
    });
  };

  return (
    <Container fluid className="mt-3 d-flex flex-column align-items-center">
      <div className="title mb-3">
        <h2>Manager Company Information</h2>
      </div>
      <div className="form-container">
        {showSuccessMessage && (
          <div className="alert alert-success mt-3" role="alert">
            Company information saved successfully!
          </div>
        )}
        <Form
          className="container-custom"
          onSubmit={handleSubmit}
          onReset={handleReset}
        >
          <Form.Group className="mt-3">
            <Form.Label className="form-label">Company Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Enter company name"
              value={companyInfo.name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Label className="form-label">Tax Code</Form.Label>
            <Form.Control
              type="text"
              name="taxCode"
              placeholder="Enter tax code"
              value={companyInfo.taxCode}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Label className="form-label">Address</Form.Label>
            <Form.Control
              type="text"
              name="address"
              placeholder="Enter address"
              value={companyInfo.address}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Label className="form-label">Legal Representative</Form.Label>
            <Form.Control
              type="text"
              name="legalRepresentative"
              placeholder="Enter legal representative name"
              value={companyInfo.legalRepresentative}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mt-4 d-flex justify-content-between">
            <Button variant="primary" type="submit" className="btn-custom-save">
              Save
            </Button>
            <Button variant="primary" type="reset" className="btn-custom-reset">
              Reset
            </Button>
          </Form.Group>
        </Form>
      </div>
    </Container>
  );
}

export default ManagerCompanyInformation;
