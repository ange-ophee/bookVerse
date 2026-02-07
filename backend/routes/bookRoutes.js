const express = require('express');
const {
  getBooks,
  addBook,
  getBookById,
  deleteBook
} = require('../controllers/bookController');

const { addReview } = require('../controllers/reviewController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getBooks);
router.post('/', protect, addBook);
router.get('/:id', getBookById);
router.post('/:id/reviews', protect, addReview);

// THIS WAS MISSING
router.delete('/:id', protect, deleteBook);

module.exports = router;
