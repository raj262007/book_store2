const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const Book = require('./models/Book');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/books', require('./routes/books'));
app.use('/api/library', require('./routes/userLibrary'));

// Seed books on startup (optional)
app.post('/api/seed', async (req, res) => {
  try {
    const booksData = require('./data/books.json');
    
    // Clear existing books
    await Book.deleteMany({});
    
    // Add sample content to each book
    const booksWithContent = booksData.map(book => ({
      ...book,
      content: `This is the full content of "${book.title}" by ${book.author}.\n\n${book.summary}\n\n[Full book content would be displayed here]`
    }));
    
    const createdBooks = await Book.insertMany(booksWithContent);
    res.status(201).json({
      success: true,
      message: `${createdBooks.length} books seeded successfully`,
      books: createdBooks
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'Server is running' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
