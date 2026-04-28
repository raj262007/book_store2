const Book = require('../models/Book');

exports.getAllBooks = async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = {};

    if (category) {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { author: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } },
      ];
    }

    const books = await Book.find(query).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: books.length,
      books,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // Increment total reads
    book.totalReads += 1;
    await book.save();

    res.status(200).json({
      success: true,
      book,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getBooksByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const books = await Book.find({ category }).sort({ rating: -1 });
    res.status(200).json({
      success: true,
      count: books.length,
      books,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createBook = async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json({
      success: true,
      book,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
