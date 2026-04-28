import React from 'react';
import './styles/Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { FiLogOut, FiUser, FiHome } from 'react-icons/fi';
import { AiOutlineBook } from 'react-icons/ai';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <AiOutlineBook className="logo-icon" />
          BookStore
        </Link>
        <div className="navbar-menu">
          <Link to="/" className="nav-link">
            <FiHome /> Home
          </Link>
          {token ? (
            <>
              <Link to="/dashboard" className="nav-link">
                <FiUser /> Dashboard
              </Link>
              <button onClick={handleLogout} className="nav-link logout-btn">
                <FiLogOut /> Logout ({user.name})
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">
                Login
              </Link>
              <Link to="/signup" className="nav-link signup-btn">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
