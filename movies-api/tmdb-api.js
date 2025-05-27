import fetch from 'node-fetch';

const BASE_URL = 'https://api.themoviedb.org/3';

/**
 
 * @param {string} endpoint 
 * @returns {Promise<Object>} 
 * @throws {Error} 
 */
const makeRequest = async (endpoint) => {
  const API_KEY = process.env.TMDB_KEY;

  if (!API_KEY) {
    throw new Error('TMDB_KEY is not defined in environment variables when making API request');
  }

  const url = `${BASE_URL}${endpoint}?api_key=${API_KEY}`;
  console.log(`🔗 Request: ${url}`);

  const res = await fetch(url);
  if (!res.ok) {
    const error = await res.json();
    console.error(' TMDB API Error:', error);
    throw new Error(error.status_message || 'TMDB API request failed');
  }
  return res.json();
};
export const getMovies = () => makeRequest('/discover/movie');
export const getUpcomingMovies = () => makeRequest('/movie/upcoming');
export const getNowPlayingMovies = () => makeRequest('/movie/now_playing');
export const getPopularMovies = () => makeRequest('/movie/popular');
export const getMovie = (id) => makeRequest(`/movie/${id}`);
export const getMovieReviews = (id) => makeRequest(`/movie/${id}/reviews`);
export const getMovieImages = (id) => makeRequest(`/movie/${id}/images`);
export const getMovieCredits = (id) => makeRequest(`/movie/${id}/credits`);
export const getGenres = () => makeRequest('/genre/movie/list');
