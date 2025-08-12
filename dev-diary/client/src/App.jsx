import { Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Signup from './components/Signup';
import StandupForm from './components/StandupForm';
import StandupList from './components/StandupList';
import EditStandup from './components/EditStandup';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar isAuthenticated={isAuthenticated} setAuth={setAuth} />
      <div className="container">
        <Routes>
          <Route
            path="/login"
            element={
              !isAuthenticated ? (
                <Login setAuth={setAuth} />
              ) : (
                <Navigate to="/standups" />
              )
            }
          />
          <Route
            path="/signup"
            element={
              !isAuthenticated ? (
                <Signup setAuth={setAuth} />
              ) : (
                <Navigate to="/standups" />
              )
            }
          />
          <Route
            path="/standups"
            element={
              isAuthenticated ? (
                <>
                  <StandupForm />
                  <StandupList />
                </>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/standups/:id"
            element={
              isAuthenticated ? (
                <EditStandup />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Navigate to="/standups" />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;