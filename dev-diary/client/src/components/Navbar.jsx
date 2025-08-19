import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ isAuthenticated, setAuth }) => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    setAuth(false);
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <h1>
        <Link to="/">Dev Diary</Link>
      </h1>
      <ul>
        {isAuthenticated ? (
          <>
            <li>
              <Link to="/standups">My Standups</Link>
            </li>
            <li>
              <button onClick={logout} className="btn-logout">
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;


step2
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import DailyTask from "./DailyTask";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/daily-task" element={<DailyTask />} />
      </Routes>
    </Router>
  );
}

export default App;

step3
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();  // 👈 Hook to navigate

  const handleLogin = async () => {
    const res = await axios.post("http://localhost:5000/login", { email, password });
    if (res.data.token) {
      localStorage.setItem("token", res.data.token);
      alert("Login Successful!");
      navigate("/daily-task");   // 👈 Move to DailyTask page
    } else {
      alert(res.data.m);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
 step4
 import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <Link to="/">Login</Link> | 
      <Link to="/register">Register</Link> | 
      <Link to="/daily-task">Daily Task</Link>
    </nav>
  );
}
