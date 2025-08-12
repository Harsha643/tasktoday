import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const StandupList = () => {
  const [standups, setStandups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStandups = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            'x-auth-token': token,
          },
        };

        const res = await axios.get('http://localhost:5000/api/standups', config);
        setStandups(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err.response.data);
        setLoading(false);
      }
    };

    fetchStandups();
  }, []);

  const deleteStandup = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'x-auth-token': token,
        },
      };

      if (window.confirm('Are you sure you want to delete this standup?')) {
        await axios.delete(`http://localhost:5000/api/standups/${id}`, config);
        setStandups(standups.filter((standup) => standup._id !== id));
      }
    } catch (err) {
      console.error(err.response.data);
      alert('Error deleting standup');
    }
  };

  if (loading) {
    return <div>Loading standups...</div>;
  }

  return (
    <div className="standup-list-container">
      <h2>Your Standups</h2>
      {standups.length === 0 ? (
        <p>No standups found. Add your first standup!</p>
      ) : (
        standups.map((standup) => (
          <div key={standup._id} className="standup-card">
            <div className="standup-date">
              {new Date(standup.date).toLocaleDateString()}
            </div>
            <div className="standup-content">
              <div className="standup-section">
                <h3>Yesterday:</h3>
                <p>{standup.yesterday}</p>
              </div>
              <div className="standup-section">
                <h3>Today:</h3>
                <p>{standup.today}</p>
              </div>
              {standup.blockers && (
                <div className="standup-section">
                  <h3>Blockers:</h3>
                  <p>{standup.blockers}</p>
                </div>
              )}
            </div>
            <div className="standup-actions">
              <Link to={`/standups/${standup._id}`} className="btn btn-edit">
                Edit
              </Link>
              <button
                onClick={() => deleteStandup(standup._id)}
                className="btn btn-delete"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default StandupList;