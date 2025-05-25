import express from 'express';
import asyncHandler from 'express-async-handler';
import {
  getMovies,
  getUpcomingMovies,
  getNowPlayingMovies,
  getPopularMovies,
  getMovie,
  getMovieReviews,
  getMovieImages,
  getMovieCredits,
  getGenres,
} from '../../tmdb-api.js';

const router = express.Router();

router.get('/discover', asyncHandler(async (req, res) => {
  const data = await getMovies();
  res.status(200).json(data);
}));

router.get('/upcoming', asyncHandler(async (req, res) => {
  const data = await getUpcomingMovies();
  res.status(200).json(data);
}));

router.get('/now_playing', asyncHandler(async (req, res) => {
  const data = await getNowPlayingMovies();
  res.status(200).json(data);
}));

router.get('/popular', asyncHandler(async (req, res) => {
  const data = await getPopularMovies();
  res.status(200).json(data);
}));

router.get('/:id', asyncHandler(async (req, res) => {
  const data = await getMovie(req.params.id);
  res.status(200).json(data);
}));

router.get('/:id/reviews', asyncHandler(async (req, res) => {
  const data = await getMovieReviews(req.params.id);
  res.status(200).json(data);
}));

router.get('/:id/images', asyncHandler(async (req, res) => {
  const data = await getMovieImages(req.params.id);
  res.status(200).json(data);
}));

router.get('/:id/credits', asyncHandler(async (req, res) => {
  const data = await getMovieCredits(req.params.id);
  res.status(200).json(data);
}));

router.get('/genres/list', asyncHandler(async (req, res) => {
  const data = await getGenres();
  res.status(200).json(data);
}));

export default router;
