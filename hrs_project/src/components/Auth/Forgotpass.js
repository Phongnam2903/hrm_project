import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import "../Auth/css/ForgotPassword.css";
import Background from "../../assets/images/bglogin/background.png";
import logo from "../../assets/images/logos/hrm1.jpg";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [step, setStep] = useState(1);
  const [resetCode, setResetCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSendResetCode = async (event) => {
    event.preventDefault();
    const response = await fetch("http://localhost:9999/send-reset-code", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    const result = await response.text();
    if (response.ok) {
      setShowAlert(true);
      setAlertMessage("A reset code has been sent to your email.");
      setStep(2);
    } else {
      setShowAlert(true);
      setAlertMessage(result);
    }
  };

  const handleVerifyResetCode = async (event) => {
    event.preventDefault();
    const response = await fetch("http://localhost:9999/verify-reset-code", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, resetCode }),
    });
    const result = await response.text();
    if (response.ok) {
      setShowAlert(true);
      setAlertMessage("Reset code verified. You can now reset your password.");
      setStep(3);
    } else {
      setShowAlert(true);
      setAlertMessage(result);
    }
  };

  const handleResetPassword = async (event) => {
    event.preventDefault();
    if (newPassword !== confirmPassword) {
      setShowAlert(true);
      setAlertMessage("Passwords do not match.");
      return;
    }
    const response = await fetch("http://localhost:9999/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, newPassword, resetCode }),
    });
    const result = await response.text();
    if (response.ok) {
      setShowAlert(true);
      setAlertMessage("Password reset successful. You can now log in.");
    } else {
      setShowAlert(true);
      setAlertMessage(result);
    }
  };

  return (
    <div
      className="forgot-password__wrapper"
      style={{ backgroundImage: `url(${Background})` }}
    >
      <Form
        className="shadow p-4 bg-white rounded"
        onSubmit={step === 1 ? handleSendResetCode : handleResetPassword}
      >
        <img
          className="img-thumbnail mx-auto d-block mb-2"
          src={logo}
          alt="logo"
        />
        <div className="h4 mb-2 text-center">Forgot Password</div>
        {showAlert && (
          <Alert
            className="mb-2"
            variant="success"
            onClose={() => setShowAlert(false)}
            dismissible
          >
            {alertMessage}
          </Alert>
        )}
        {step === 1 && (
          <>
            <Form.Group className="mb-2" controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                value={email}
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Button className="w-100 mb-2" variant="primary" type="submit">
              Send Reset Code
            </Button>
          </>
        )}
        {step === 2 && (
          <>
            <Form.Group className="mb-2" controlId="resetCode">
              <Form.Label>Reset Code</Form.Label>
              <Form.Control
                type="text"
                value={resetCode}
                placeholder="Enter the reset code"
                onChange={(e) => setResetCode(e.target.value)}
                required
              />
            </Form.Group>
            <Button
              className="w-100 mb-2"
              variant="primary"
              onClick={handleVerifyResetCode}
            >
              Verify Reset Code
            </Button>
          </>
        )}
        {step === 3 && (
          <>
            <Form.Group className="mb-2" controlId="newPassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                value={newPassword}
                placeholder="Enter new password"
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-2" controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                value={confirmPassword}
                placeholder="Confirm new password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button className="w-100 mb-2" variant="primary" type="submit">
              Reset Password
            </Button>
          </>
        )}
        <Button className="w-100" variant="secondary" href="/login">
          Cancel
        </Button>
      </Form>
      <div className="w-100 mb-2 position-absolute bottom-0 start-50 translate-middle-x text-white text-center">
        Made by HRM
      </div>
    </div>
  );
};

export default ForgotPassword;
