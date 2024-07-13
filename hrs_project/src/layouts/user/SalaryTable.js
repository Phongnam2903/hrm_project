// SalaryTable.js
import React from "react";
import { Table, Container } from "react-bootstrap";

const SalaryTable = () => {
  return (
    <Container className="mt-4">
      <h1>Monthly Salary Table</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Position</th>
            <th>Salary</th>
            <th>Bonus</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Do Minh Vuong</td>
            <td>Manager</td>
            <td>$5000</td>
            <td>$500</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jane Doe</td>
            <td>Developer</td>
            <td>$4000</td>
            <td>$400</td>
          </tr>
          <tr>
            <td>3</td>
            <td>John Smith</td>
            <td>Designer</td>
            <td>$3500</td>
            <td>$350</td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
};

export default SalaryTable;
