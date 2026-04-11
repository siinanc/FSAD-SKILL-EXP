import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        if (!res.ok) throw new Error("Network error");
        return res.json();
      })
      .then((data) => {
        setUsers(data.slice(0, 5));
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="loading-text">Loading users...</p>;
  if (error) return <p className="error-text">Error: {error}</p>;

  return (
    <div className="page-container">
      <Link to="/" className="back-link">← Back to Dashboard</Link>
      <h2>Users from JSONPlaceholder</h2>
      <p className="page-subtitle">Data fetched from jsonplaceholder.typicode.com API</p>

      <table className="data-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="table-info">
        Showing {users.length} of 10 users fetched from API
      </p>
    </div>
  );
}

export default UserList;
