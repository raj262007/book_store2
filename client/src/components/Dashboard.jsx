import React, { useEffect, useState } from 'react';
import './styles/Dashboard.css';
import axios from 'axios';
import BookCard from './BookCard';
import { FiUser, FiLogOut } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [savedBooks, setSavedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    fetchSavedBooks();
  }, [token, navigate]);

  const fetchSavedBooks = async () => {
    try {
      const response = await axios.get('/api/library', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSavedBooks(response.data.savedBooks);
      setLoading(false);
    } catch (err) {
      setError('Failed to load saved books');
      setLoading(false);
    }
  };

  const handleRead = (bookId) => {
    navigate(`/reader/${bookId}`);
  };

  const handleDownload = (url) => {
    window.open(url, '_blank');
  };

  const handleRemove = async (bookId) => {
    try {
      await axios.delete(`/api/library/${bookId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSavedBooks(savedBooks.filter((book) => book._id !== bookId));
    } catch (err) {
      console.error('Failed to remove book');
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="profile-section">
          <div className="profile-icon">
            <FiUser />
          </div>
          <div className="profile-info">
            <h2>Welcome, {user.name}!</h2>
            <p>{user.email}</p>
          </div>
        </div>
        <button
          onClick={() => {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            navigate('/login');
          }}
          className="logout-btn"
        >
          <FiLogOut /> Logout
        </button>
      </div>

      <div className="saved-books-section">
        <h3>Your Saved Books ({savedBooks.length})</h3>
        {loading ? (
          <div className="loading">Loading your books...</div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : savedBooks.length === 0 ? (
          <div className="no-books">
            <p>You haven't saved any books yet!</p>
            <button onClick={() => navigate('/')} className="explore-btn">
              Explore Books
            </button>
          </div>
        ) : (
          <div className="books-grid">
            {savedBooks.map((book) => (
              <BookCard
                key={book._id}
                book={book}
                onRead={handleRead}
                onDownload={handleDownload}
                onRemove={handleRemove}
                isSaved={true}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
