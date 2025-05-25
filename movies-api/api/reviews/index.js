import express from 'express';
import asyncHandler from 'express-async-handler';
import Review from './reviewModel.js'; 

const router = express.Router();
const simulateAuth = (req, res, next) => {
  // In a real application, req.user.id would come from a JWT or session
  req.userId = 'demoUserId123'; // Replace with actual user ID from authentication
  next();
};

// POST /api/reviews - Create a new review
router.post('/', simulateAuth, asyncHandler(async (req, res) => {
  const { movieId, rating, comment } = req.body;
  const userId = req.userId; // Get userId from simulated auth middleware

  // Basic validation
  if (!movieId || !userId || !rating || !comment) {
    return res.status(400).json({ message: 'Missing required fields: movieId, rating, comment' });
  }

  if (rating < 1 || rating > 5) {
    return res.status(400).json({ message: 'Rating must be between 1 and 5.' });
  }

  try {
    const newReview = new Review({
      movieId,
      userId,
      rating,
      comment,
    });

    await newReview.save();
    res.status(201).json({ message: 'Review created successfully', review: newReview });
  } catch (error) {
    // Handle duplicate review (same user, same movie)
    if (error.code === 11000) {
      return res.status(409).json({ message: 'You have already reviewed this movie.' });
    }
    console.error('Error creating review:', error);
    res.status(500).json({ message: 'Failed to create review', error: error.message });
  }
}));


router.get('/movie/:movieId', asyncHandler(async (req, res) => {
  const { movieId } = req.params;
  const reviews = await Review.find({ movieId: parseInt(movieId) }).sort({ createdAt: -1 }); 
  if (reviews.length === 0) {
    return res.status(404).json({ message: 'No reviews found for this movie.' });
  }
  res.status(200).json(reviews);
}));


router.get('/user/:userId', asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const reviews = await Review.find({ userId }).sort({ createdAt: -1 }); 
  if (reviews.length === 0) {
    return res.status(404).json({ message: 'No reviews found for this user.' });
  }
  res.status(200).json(reviews);
}));
router.put('/:id', simulateAuth, asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { rating, comment } = req.body;
  const userId = req.userId;

  const review = await Review.findOne({ _id: id, userId });

  if (!review) {
    return res.status(404).json({ message: 'Review not found or you do not have permission to update it.' });
  }

  if (rating !== undefined) {
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5.' });
    }
    review.rating = rating;
  }
  if (comment !== undefined) {
    if (comment.length < 10) {
      return res.status(400).json({ message: 'Comment must be at least 10 characters long.' });
    }
    review.comment = comment;
  }

  await review.save();
  res.status(200).json({ message: 'Review updated successfully', review });
}));

router.delete('/:id', simulateAuth, asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;

  const result = await Review.deleteOne({ _id: id, userId });

  if (result.deletedCount === 0) {
    return res.status(404).json({ message: 'Review not found or you do not have permission to delete it.' });
  }
  res.status(200).json({ message: 'Review deleted successfully' });
}));

export default router;