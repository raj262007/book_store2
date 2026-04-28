const express = require('express');
const router = express.Router();
const {
  saveBook,
  removeSavedBook,
  getSavedBooks,
} = require('../controllers/userLibraryController');
const auth = require('../middleware/auth');

router.post('/save', auth, saveBook);
router.delete('/:bookId', auth, removeSavedBook);
router.get('/', auth, getSavedBooks);

module.exports = router;
