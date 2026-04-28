const User = require('../models/User');
const Book = require('../models/Book');

exports.saveBook = async (req, res) => {
  try {
    const userId = req.user.id;
    const { bookId } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if book already saved
    if (user.savedBooks.includes(bookId)) {
      return res.status(400).json({ message: 'Book already saved' });
    }

    user.savedBooks.push(bookId);
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Book saved successfully',
      savedBooks: user.savedBooks,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.removeSavedBook = async (req, res) => {
  try {
    const userId = req.user.id;
    const { bookId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.savedBooks = user.savedBooks.filter(
      (id) => id.toString() !== bookId
    );
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Book removed from saved books',
      savedBooks: user.savedBooks,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getSavedBooks = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('savedBooks');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      success: true,
      savedBooks: user.savedBooks,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
