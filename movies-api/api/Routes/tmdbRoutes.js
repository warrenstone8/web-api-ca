import express from 'express';
import asyncHandler from 'express-async-handler';
import {
  getMovies,
  getUpcomingMovies,
  getPopularMovies,
  getNowPlayingMovies,
  getMovie,
  getMovieCredits
} from '../tmdb-api.js';

const router = express.Router();

router.get('/discover', asyncHandler(async (req, res) => {
  const discoverMovies = await getMovies();
  res.status(200).json(discoverMovies);
}));

router.get('/upcoming', asyncHandler(async (req, res) => {
  const movies = await getUpcomingMovies();
  res.status(200).json(movies);
}));

router.get('/popular', asyncHandler(async (req, res) => {
  const movies = await getPopularMovies();
  res.status(200).json(movies);
}));

router.get('/now-playing', asyncHandler(async (req, res) => {
  const movies = await getNowPlayingMovies();
  res.status(200).json(movies);
}));

router.get('/:id', asyncHandler(async (req, res) => {
  const movie = await getMovie(req.params.id);
  res.status(200).json(movie);
}));

router.get('/:id/credits', asyncHandler(async (req, res) => {
  const credits = await getMovieCredits(req.params.id);
  res.status(200).json(credits);
}));

export default router;
