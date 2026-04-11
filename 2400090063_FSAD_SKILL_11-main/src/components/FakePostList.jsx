import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function FakePostList() {
  const [posts, setPosts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [userId, setUserId] = useState("all");
  const [userIds, setUserIds] = useState([]);

  const loadPosts = () => {
    axios.get("https://dummyjson.com/posts").then((res) => {
      const data = res.data.posts;
      setPosts(data);
      setFiltered(data);
      const ids = [...new Set(data.map((p) => p.userId))];
      setUserIds(ids.sort((a, b) => a - b));
    });
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handleFilter = (e) => {
    const val = e.target.value;
    setUserId(val);
    if (val === "all") setFiltered(posts);
    else setFiltered(posts.filter((p) => p.userId === Number(val)));
  };

  return (
    <div className="page-container">
      <Link to="/" className="back-link">← Back to Dashboard</Link>
      <h2>Fake API Posts</h2>
      <p className="page-subtitle">Posts fetched from dummyjson.com using Axios</p>

      <div className="filter-bar">
        <label>Filter by User ID:</label>
        <select value={userId} onChange={handleFilter}>
          <option value="all">All Users ▾</option>
          {userIds.map((id) => (
            <option key={id} value={id}>User {id}</option>
          ))}
        </select>
        <button className="btn-refresh" onClick={loadPosts}>
          🔄 Refresh
        </button>
      </div>

      <ul className="post-list">
        {filtered.map((p) => (
          <li key={p.id} className="post-card">
            <span className="post-user-tag">User {p.userId}</span>
            <h3>{p.title}</h3>
            <p>{p.body}</p>
            {p.tags && (
              <div className="post-tags">
                {p.tags.map((tag, i) => (
                  <span key={i}>#{tag}</span>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FakePostList;
