const express = require('express');
const router = express.Router();
const {
  getAllBooks,
  getBookById,
  getBooksByCategory,
  createBook,
} = require('../controllers/bookController');

router.get('/', getAllBooks);
router.get('/:id', getBookById);
router.get('/category/:category', getBooksByCategory);
router.post('/', createBook);

module.exports = router;
