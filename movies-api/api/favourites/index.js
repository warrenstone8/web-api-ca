import express from 'express';
    import asyncHandler from 'express-async-handler';
    import Favourite from './favouriteModel.js';

    const router = express.Router();

    const simulateAuth = (req, res, next) => {
      req.userId = 'demoUserId123';
      console.log('DEBUG: Inside simulateAuth. req.userId set to:', req.userId); // ADD THIS LINE
      next();
    };

    // GET /api/favourites/user/:userId - Get all favourite movies for a specific user
    router.get('/user/:userId', asyncHandler(async (req, res) => {
      const { userId } = req.params;
      const favourites = await Favourite.find({ userId });
      if (favourites.length === 0) {
        return res.status(404).json({ message: 'No favourite movies found for this user.' });
      }
      res.status(200).json(favourites);
    }));

    // POST /api/favourites - Add a movie to a user's favourites
    router.post('/', simulateAuth, asyncHandler(async (req, res) => {
      const { movieId } = req.body;
      const userId = req.userId; // Get userId from simulated auth middleware
      console.log('DEBUG: Inside POST /api/favourites. Received movieId:', movieId, 'userId from req:', userId); // ADD THIS LINE

      if (!movieId) {
        return res.status(400).json({ message: 'Missing movieId in request body.' });
      }

      try {
        const newFavourite = new Favourite({
          userId,
          movieId: parseInt(movieId),
        });

        await newFavourite.save();
        res.status(201).json({ message: 'Movie added to favourites successfully', favourite: newFavourite });
      } catch (error) {
        if (error.code === 11000) {
          return res.status(409).json({ message: 'Movie is already in your favourites.' });
        }
        console.error('Error adding movie to favourites:', error); // This is likely the line printing your current 500 error
        res.status(500).json({ message: 'Failed to add movie to favourites', error: error.message });
      }
    }));

    // DELETE /api/favourites/:movieId - Remove a movie from a user's favourites
    router.delete('/:movieId', simulateAuth, asyncHandler(async (req, res) => {
      const { movieId } = req.params;
      const userId = req.userId;

      const result = await Favourite.deleteOne({ userId, movieId: parseInt(movieId) });

      if (result.deletedCount === 0) {
        return res.status(404).json({ message: 'Movie not found in your favourites or you do not have permission to delete it.' });
      }
      res.status(200).json({ message: 'Movie removed from favourites successfully' });
    }));

    export default router;