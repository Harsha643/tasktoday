import { useState } from 'react';
import axios from 'axios';

const StandupForm = () => {
  const [formData, setFormData] = useState({
    yesterday: '',
    today: '',
    blockers: '',
  });

  const { yesterday, today, blockers } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
      };

      const res = await axios.post(
        'http://localhost:5000/api/standups',
        { yesterday, today, blockers },
        config
      );

      // Clear form
      setFormData({
        yesterday: '',
        today: '',
        blockers: '',
      });

      alert('Standup added successfully!');
      // Refresh the page to show the new standup
      window.location.reload();
    } catch (err) {
      console.error(err.response.data);
      alert('Error adding standup');
    }
  };

  return (
    <div className="standup-form-container">
      <h2>Add New Standup</h2>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="yesterday">Yesterday's Work</label>
          <textarea
            id="yesterday"
            name="yesterday"
            value={yesterday}
            onChange={onChange}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="today">Today's Plan</label>
          <textarea
            id="today"
            name="today"
            value={today}
            onChange={onChange}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="blockers">Blockers</label>
          <textarea
            id="blockers"
            name="blockers"
            value={blockers}
            onChange={onChange}
          ></textarea>
        </div>
        <button type="submit" className="btn">
          Add Standup
        </button>
      </form>
    </div>
  );
};

export default StandupForm;