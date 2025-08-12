import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditStandup = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    yesterday: '',
    today: '',
    blockers: '',
  });

  useEffect(() => {
    const fetchStandup = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            'x-auth-token': token,
          },
        };

        const res = await axios.get(`http://localhost:5000/api/standups/${id}`, config);
        setFormData({
          yesterday: res.data.yesterday,
          today: res.data.today,
          blockers: res.data.blockers,
        });
      } catch (err) {
        console.error(err.response.data);
        alert('Error fetching standup');
        navigate('/standups');
      }
    };

    fetchStandup();
  }, [id, navigate]);

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

      await axios.put(
        `http://localhost:5000/api/standups/${id}`,
        { yesterday, today, blockers },
        config
      );

      alert('Standup updated successfully!');
      navigate('/standups');
    } catch (err) {
      console.error(err.response.data);
      alert('Error updating standup');
    }
  };

  return (
    <div className="standup-form-container">
      <h2>Edit Standup</h2>
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
          Update Standup
        </button>
      </form>
    </div>
  );
};

export default EditStandup;