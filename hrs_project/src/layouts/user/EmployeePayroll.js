import React from 'react';
import { Table, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// import '../css/EmployeePayroll.css';

const EmployeePayroll = () => {
  const employeeInfo = {
    'Full Name': 'Nguyen Van A',
    'Customer ID ': 'NV001',
    'Department': 'Business',
    'Position': 'Manager'
  };

  const payrollData = {
    'Basic Salary': 15000000,
    'Business Salary': 5000000,
    'Other Allowances': 2000000,
    'Total Income': 22000000,
    'Social Insurance': 1500000,
    'Health Insurance': 750000,
    'Unemployment Insurance': 150000,
    'Union Fees': 100000,
    'Personal Income Tax': 1000000,
    'Total Deductions': 3500000,
    'Deductions for Unpaid Leave': 1000000,
    'Net Salary': 17500000,
  };

  const handleFeedback = () => {
    alert('Phản hồi thắc mắc');
    // Here you can add any action you want to perform when the button is clicked
  };

  return (
    <div className="employee-payroll">
      <div className="table-payroll">
        <h2 className="my-4">Custommer Information</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th className="category-column">Category</th>
              <th className="details-column">Details</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(employeeInfo).map(([category, details]) => (
              <tr key={category}>
                <td className="category-column">{category}</td>
                <td className="details-column">{details}</td>
              </tr>
            ))}
          </tbody>
        </Table>

        <h2 className="my-4">Payroll Information</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th className="category-column">Category</th>
              <th className="amount-column">Amount (VND)</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(payrollData).map(([category, amount]) => (
              <tr key={category}>
                <td className="category-column">{category}</td>
                <td className="amount-column">{amount.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </Table>

        <div className="button-container">
          <Button variant="primary" onClick={handleFeedback}>Respond to inquiries</Button>
        </div>
      </div>

    </div>
  );
};

export default EmployeePayroll;
