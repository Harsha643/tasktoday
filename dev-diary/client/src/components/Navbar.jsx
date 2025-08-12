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