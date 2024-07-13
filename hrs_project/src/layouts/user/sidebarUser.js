import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../user/css/sidebarUser.css";

export default function Sidebar({ setCurrentView }) {
  const employeeDetails = {
    name: "Do Minh Vuong",
    position: "Manager",
    photo: "https://via.placeholder.com/150", // Placeholder image URL, replace with actual image URL
  };

  return (
    <div className="layout-container">
      <img
        src={employeeDetails.photo}
        alt="Employee"
        className="employee-photo"
      />
      <div className="employee-info">
        <h3>{employeeDetails.name}</h3>
        <p>{employeeDetails.position}</p>
        <hr className="custom-hr" />
      </div>
      <div className="menu">
        <Link to="/user" onClick={() => setCurrentView("Home")}>
          <i className="bi bi-house-heart-fill"></i> Home
        </Link>
        <Link to="/user/profile" onClick={() => setCurrentView("Profile")}>
          <i className="bi bi-person-square"></i> Profile
        </Link>
        <Link to="/user/payrolluser" onClick={() => setCurrentView("Payroll")}>
          <i className="bi bi-currency-dollar"></i> Monthly Payroll
        </Link>
        <Link
          to="/user/salarytable"
          onClick={() => setCurrentView("SalaryTable")}
        >
          <i className="bi bi-currency-dollar"></i> Monthly Salary Table
        </Link>
        <Link to="/user/blog" onClick={() => setCurrentView("Blog")}>
          <i className="bi bi-bookmark-heart"></i> Blog
        </Link>
      </div>
      <div className="additional-image">
        <img
          src="./images/hrm1.jpg"
          alt="Additional"
          className="additional-photo"
        />
      </div>
    </div>
  );
}
