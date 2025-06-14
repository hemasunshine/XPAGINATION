import React, { useEffect, useState } from "react";

const XPagination = () => {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const EMPLOYEES_PER_PAGE = 10;

  useEffect(() => {
    const fetchEmployees = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        setError(error.message);
        alert("Failed to fetch data");
      } finally {
        setIsLoading(false);
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
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  if (isLoading) {
    return <div style={{ textAlign: "center", padding: "2rem" }}>Loading...</div>;
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h2 style={{ textAlign: "center" }}>Employee Data Table</h2>

      {error && (
        <p style={{ color: "red", textAlign: "center" }}>Error: {error}</p>
      )}

      <table
        border="1"
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "2rem",
          textAlign: "center",
        }}
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
        <button
          data-testid="prev-btn"
          onClick={handlePrevious}
          disabled={currentPage === 1 || isLoading}
          style={{ 
            backgroundColor: "teal", 
            color: "white",
            margin: "0 0.5rem",
            padding: "0.5rem 1rem",
            border: "none",
            borderRadius: "4px",
            cursor: currentPage === 1 ? "not-allowed" : "pointer",
            opacity: currentPage === 1 ? 0.6 : 1
          }}
        >
          Previous
        </button>

        <span
          data-testid="page-number"
          style={{
            margin: "0 1rem",
            padding: "0.5rem 1rem",
            display: "inline-block",
            backgroundColor: "teal",
            color: "white",
            borderRadius: "4px",
          }}
        >
          {currentPage} 
        </span>

        <button
          data-testid="next-btn"
          onClick={handleNext}
          disabled={currentPage === totalPages || isLoading}
          style={{ 
            backgroundColor: "teal", 
            color: "white",
            margin: "0 0.5rem",
            padding: "0.5rem 1rem",
            border: "none",
            borderRadius: "4px",
            cursor: currentPage === totalPages ? "not-allowed" : "pointer",
            opacity: currentPage === totalPages ? 0.6 : 1
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default XPagination;