import React, { useEffect, useState } from "react";
import { Card, CardBody, CardTitle, Table, Button } from "reactstrap";
import "../../components/dashboard/css/listacc.css";

const Account = () => {
  const [accounts, setAccounts] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    fetch("http://localhost:9999/users")
      .then((res) => res.json())
      .then((data) => setAccounts(data))
      .catch((err) => console.error("Error fetching users", err));
  }, []);

  const handleSearch = () => {
    const filteredAccounts = accounts.filter((account) => {
      const keyword = searchKeyword.toLowerCase().trim();
      const name = account.name ? account.name.toLowerCase() : "";
      const email = account.email ? account.email.toLowerCase() : "";
      const role =
        account.role === 0
          ? "admin"
          : account.role === 1
          ? "employee"
          : "manager";
      const roleLowerCase = role.toLowerCase();
      const phoneNumber = account.phoneNumber
        ? account.phoneNumber.toLowerCase()
        : "";
      const dateOfStart = account.dateOfStart;

      const dateMatches =
        (!startDate || new Date(dateOfStart) >= new Date(startDate)) &&
        (!endDate || new Date(dateOfStart) <= new Date(endDate));

      return (
        (name.includes(keyword) ||
          email.includes(keyword) ||
          roleLowerCase.includes(keyword) ||
          phoneNumber.includes(keyword)) &&
        dateMatches
      );
    });

    return filteredAccounts;
  };

  const filteredAccounts = handleSearch();

  const handleDeleteAccount = (accountId) => {
    fetch(`http://localhost:9999/users/${accountId}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          const updatedAccounts = accounts.filter(
            (account) => account.id !== accountId
          );
          setAccounts(updatedAccounts);
          alert("Account deleted successfully!");
        } else {
          alert("Failed to delete account.");
        }
      })
      .catch((error) => {
        console.error("Error deleting account:", error);
        alert("Failed to delete account. Please try again later.");
      });
  };

  return (
    <div className="container mt-4">
      <Card>
        <CardBody>
          <CardTitle tag="h5" className="mb-4" id="title_listacc">
            List Accounts
          </CardTitle>
          <div className="mb-3" id="search_bar">
            <input
              type="text"
              placeholder="Search..."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="form-control"
            />
          </div>

          <div className="mb-3" id="search_bydate">
            <label
              htmlFor="startDate"
              className="form-label me-2"
              id="title_date"
            >
              Start Date:
            </label>
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="form-control me-2"
            />
            <label
              htmlFor="endDate"
              className="form-label me-2"
              id="title_date"
            >
              End Date:
            </label>
            <input
              type="date"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="form-control"
            />
          </div>

          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Email</th>
                <th>Date of Start</th>
                <th>Status</th>
                <th>Role</th>
                <th>Phone Number</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredAccounts.map((account, index) => (
                <tr key={index}>
                  <td>
                    <div className="d-flex align-items-center">
                      <img
                        src={account.photo}
                        className="rounded-circle me-2"
                        alt="photo"
                        width="40"
                        height="40"
                      />
                      <div>
                        <h6 className="mb-0">{account.name}</h6>
                        <span className="text-muted">{account.email}</span>
                      </div>
                    </div>
                  </td>
                  <td>{account.dateOfStart}</td>
                  <td>
                    <span
                      className={`p-2 rounded-circle d-inline-block ${
                        account.status === "pending"
                          ? "bg-danger"
                          : account.status === "hold"
                          ? "bg-warning"
                          : "bg-success"
                      }`}
                    ></span>
                  </td>
                  <td>
                    {account.role === 0
                      ? "Admin"
                      : account.role === 1
                      ? "Employee"
                      : "Manager"}
                  </td>
                  <td>{account.phoneNumber}</td>
                  <td>
                    <Button
                      color="danger"
                      size="sm"
                      onClick={() => handleDeleteAccount(account.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};

export default Account;
