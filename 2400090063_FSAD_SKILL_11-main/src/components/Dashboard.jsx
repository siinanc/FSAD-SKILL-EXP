import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className="dashboard-container">
      <h2>Welcome to the News Portal Dashboard</h2>
      <p>Navigate to a section using the links below:</p>

      <nav className="dashboard-nav">
        <Link to="/local-users" className="btn-local">
          📁 Local Users
        </Link>
        <Link to="/users-api" className="btn-api">
          🌐 Users API
        </Link>
        <Link to="/fake-posts" className="btn-fake">
          📝 Fake API Posts
        </Link>
      </nav>

      <p className="dashboard-footer-text">
        Click any button above to view live data from APIs or local JSON files.
      </p>
    </div>
  );
}

export default Dashboard;
