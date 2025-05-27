
const BASE_URL = "http://localhost:3000/api/movies";

export const getMovies = () => fetch(`${BASE_URL}/discover`).then((res) => res.json());
export const getUpcomingMovies = () => fetch(`${BASE_URL}/upcoming`).then((res) => res.json());
export const getNowPlayingMovies = () => fetch(`${BASE_URL}/now_playing`).then((res) => res.json());
export const getPopularMovies = () => fetch(`${BASE_URL}/popular`).then((res) => res.json());

export const getMovie = ({ queryKey }) => {
  const [, { id }] = queryKey;
  return fetch(`${BASE_URL}/${id}`).then((res) => res.json());
};

export const getMovieReviews = ({ queryKey }) => {
  const [, { id }] = queryKey;
  return fetch(`${BASE_URL}/${id}/reviews`).then((res) => res.json());
};

export const getMovieImages = ({ queryKey }) => {
  const [, { id }] = queryKey;
  return fetch(`${BASE_URL}/${id}/images`).then((res) => res.json());
};

export const getMovieCredits = ({ queryKey }) => {
  const [, { id }] = queryKey;
  return fetch(`${BASE_URL}/${id}/credits`).then((res) => res.json());
};

export const getGenres = () => {
  return fetch(`${BASE_URL}/genres/list`).then((res) => res.json());
};

