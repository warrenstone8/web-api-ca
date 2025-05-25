import express from 'express';
import asyncHandler from 'express-async-handler';
import Watchlist from './watchlistModel.js'; 

const router = express.Router();
const simulateAuth = (req, res, next) => {
  req.userId = 'demoUserId123'; 
  next();
};
router.get('/user/:userId', asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const watchlist = await Watchlist.find({ userId });
  if (watchlist.length === 0) {
    return res.status(404).json({ message: 'No movies found in this user\'s watchlist.' });
  }
  res.status(200).json(watchlist);
}));
router.post('/', simulateAuth, asyncHandler(async (req, res) => {
  const { movieId } = req.body;
  const userId = req.userId; 
  if (!movieId) {
    return res.status(400).json({ message: 'Missing movieId in request body.' });
  }

  try {
    const newWatchlistEntry = new Watchlist({
      userId,
      movieId: parseInt(movieId), 
    });

    await newWatchlistEntry.save();
    res.status(201).json({ message: 'Movie added to watchlist successfully', watchlist: newWatchlistEntry });
  } catch (error) {
    if (error.code === 11000) { 
      return res.status(409).json({ message: 'Movie is already in your watchlist.' });
    }
    console.error('Error adding movie to watchlist:', error);
    res.status(500).json({ message: 'Failed to add movie to watchlist', error: error.message });
  }
}));
router.delete('/:movieId', simulateAuth, asyncHandler(async (req, res) => {
  const { movieId } = req.params;
  const userId = req.userId;

  const result = await Watchlist.deleteOne({ userId, movieId: parseInt(movieId) });

  if (result.deletedCount === 0) {
    return res.status(404).json({ message: 'Movie not found in your watchlist or you do not have permission to delete it.' });
  }
  res.status(200).json({ message: 'Movie removed from watchlist successfully' });
}));

export default router;