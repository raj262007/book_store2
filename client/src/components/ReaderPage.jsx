import React, { useEffect, useState } from 'react';
import './styles/ReaderPage.css';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiArrowLeft, FiDownload } from 'react-icons/fi';

const ReaderPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`/api/books/${id}`);
        setBook(response.data.book);
        setLoading(false);
      } catch (err) {
        setError('Failed to load book');
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  if (loading) return <div className="reader-loading">Loading book...</div>;
  if (error) return <div className="reader-error">{error}</div>;

  return (
    <div className="reader-page">
      <div className="reader-header">
        <button onClick={() => navigate(-1)} className="back-btn">
          <FiArrowLeft /> Back
        </button>
        <h1>{book?.title}</h1>
        <button className="download-btn">
          <FiDownload /> Download
        </button>
      </div>
      <div className="reader-metadata">
        <p><strong>Author:</strong> {book?.author}</p>
        <p><strong>Category:</strong> {book?.category}</p>
        <p><strong>Rating:</strong> {book?.rating} ⭐</p>
        <p><strong>Published:</strong> {book?.publishedYear}</p>
      </div>
      <div className="reader-content">
        {book?.content ? (
          <div className="content-text">
            {book.content.split('\n').map((paragraph, idx) => (
              paragraph.trim() && <p key={idx}>{paragraph}</p>
            ))}
          </div>
        ) : (
          <p>Content not available</p>
        )}
      </div>
    </div>
  );
};

export default ReaderPage;
