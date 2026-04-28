import React, { useEffect, useState } from 'react';
import './styles/Home.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BookCard from '../components/BookCard';
import SearchBar from '../components/SearchBar';

const Home = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savedBookIds, setSavedBookIds] = useState([]);

  const categories = ['Horror', 'Story', 'History', 'Education', 'Poem', 'Movies'];

  useEffect(() => {
    fetchBooks();
    if (token) fetchSavedBooks();
  }, [token]);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('/api/books');
      setBooks(response.data.books);
      setFilteredBooks(response.data.books);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch books');
      setLoading(false);
    }
  };

  const fetchSavedBooks = async () => {
    try {
      const response = await axios.get('/api/library', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSavedBookIds(response.data.savedBooks.map((book) => book._id));
    } catch (error) {
      console.error('Failed to fetch saved books');
    }
  };

  const handleSearch = async (searchTerm, category) => {
    try {
      const params = {};
      if (searchTerm) params.search = searchTerm;
      if (category) params.category = category;

      const response = await axios.get('/api/books', { params });
      setFilteredBooks(response.data.books);
    } catch (error) {
      console.error('Search failed');
    }
  };

  const handleRead = (bookId) => {
    navigate(`/reader/${bookId}`);
  };

  const handleDownload = (url) => {
    window.open(url, '_blank');
  };

  const handleSave = async (bookId) => {
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      await axios.post(
        '/api/library/save',
        { bookId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSavedBookIds([...savedBookIds, bookId]);
    } catch (error) {
      console.error('Failed to save book');
    }
  };

  const handleRemove = async (bookId) => {
    try {
      await axios.delete(`/api/library/${bookId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSavedBookIds(savedBookIds.filter((id) => id !== bookId));
    } catch (error) {
      console.error('Failed to remove book');
    }
  };

  return (
    <div className="home">
      <div className="hero-section">
        <h1>Welcome to BookStore</h1>
        <p>Discover, Read, and Save Your Favorite Books</p>
      </div>

      <div className="search-section">
        <SearchBar onSearch={handleSearch} categories={categories} />
      </div>

      <div className="books-section">
        {loading ? (
          <div className="loading">Loading books...</div>
        ) : filteredBooks.length === 0 ? (
          <div className="no-results">No books found</div>
        ) : (
          <div className="books-grid">
            {filteredBooks.map((book) => (
              <BookCard
                key={book._id}
                book={book}
                onRead={handleRead}
                onDownload={handleDownload}
                onSave={handleSave}
                onRemove={handleRemove}
                isSaved={savedBookIds.includes(book._id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
