import React from 'react';
import './styles/BookCard.css';
import { FiDownload, FiSave, FiX } from 'react-icons/fi';
import { AiFillStar } from 'react-icons/ai';

const BookCard = ({ book, onRead, onDownload, onSave, onRemove, isSaved = false }) => {
  return (
    <div className="book-card">
      <div className="book-cover">
        <img src={book.coverImage} alt={book.title} />
        <div className="book-overlay">
          <button className="read-btn" onClick={() => onRead(book._id)}>
            Read
          </button>
          <button className="download-btn" onClick={() => onDownload(book.downloadUrl)}>
            <FiDownload /> Download
          </button>
        </div>
      </div>
      <div className="book-info">
        <h3 className="book-title">{book.title}</h3>
        <p className="book-author">{book.author}</p>
        <div className="book-rating">
          <AiFillStar className="star-icon" />
          <span>{book.rating}</span>
        </div>
        <p className="book-category">{book.category}</p>
        <div className="book-actions">
          {isSaved ? (
            <button className="remove-btn" onClick={() => onRemove(book._id)}>
              <FiX /> Remove
            </button>
          ) : (
            <button className="save-btn" onClick={() => onSave(book._id)}>
              <FiSave /> Save
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookCard;
