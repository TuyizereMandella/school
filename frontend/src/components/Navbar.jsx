import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="">
      <div className="">
        <div className="">
          <Link to="/" className="">Student Management</Link>

          <div className="">
            {user ? (
              <>
                <Link to="/dashboard" className="">Dashboard</Link>
                <Link to="/students" className="">Students</Link>
                <Link to="/classes" className="">Classes</Link>
                <button onClick={handleLogout} className="btn btn-primary">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="">Login</Link>
                <Link to="/register"className="btn btn-primary">Register</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 