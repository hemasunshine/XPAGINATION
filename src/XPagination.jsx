import React, { useEffect, useState } from "react";

const XPagination = () => {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);

  const EMPLOYEES_PER_PAGE = 10;

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch(
          "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        setError(error.message);
        alert("failed to fetch data");
      }
    };

    fetchEmployees();
  }, []);

  const totalPages = Math.ceil(employees.length / EMPLOYEES_PER_PAGE);
  const startIndex = (currentPage - 1) * EMPLOYEES_PER_PAGE;
  const currentEmployees = employees.slice(
    startIndex,
    startIndex + EMPLOYEES_PER_PAGE
  );

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2 style={{ textAlign: "center" }}>Employee Data Table</h2>
      <table
        border="1"
        style={{ width: "100%", borderCollapse: "collapse", marginTop: "2rem",textAlign:"center" }}
      >
        <thead style={{ backgroundColor: "teal", color: "white" }}>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {currentEmployees.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>{emp.role}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div style={{ textAlign: "center", marginTop: "1rem" }}>
        <button onClick={handlePrevious} disabled={currentPage === 1} style={{ backgroundColor: "teal", color: "white" }}>
          Previous
        </button>
        <button style={{ margin: "0 1rem" ,border:"1rem", backgroundColor: "teal", color: "white"} }>{currentPage}</button>
        <button onClick={handleNext} disabled={currentPage === totalPages}  style={{ backgroundColor: "teal", color: "white" }}>
          Next
        </button>
      </div>
    </div>
  );
};

export default XPagination;
