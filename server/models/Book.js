const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a book title'],
      trim: true,
    },
    author: {
      type: String,
      required: [true, 'Please provide author name'],
      trim: true,
    },
    category: {
      type: String,
      enum: ['Horror', 'Story', 'History', 'Education', 'Poem', 'Movies'],
      required: [true, 'Please select a category'],
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 4.5,
    },
    summary: {
      type: String,
      required: [true, 'Please provide a summary'],
    },
    content: {
      type: String,
      required: [true, 'Please provide book content'],
    },
    downloadUrl: {
      type: String,
      required: [true, 'Please provide download URL'],
    },
    coverImage: {
      type: String,
      default: 'https://via.placeholder.com/300x400?text=Book+Cover',
    },
    publishedYear: {
      type: Number,
      default: new Date().getFullYear(),
    },
    totalReads: {
      type: Number,
      default: 0,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Book', bookSchema);
