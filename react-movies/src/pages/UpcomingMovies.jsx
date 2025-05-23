import React, { useContext } from "react";
import { getPopularMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardicons/addtoFavorites';
import { MoviesContext } from "../contexts/moviesContext";

const PopularMoviesPage = (props) => {
  const { data, error, isPending, isError } = useQuery({
    queryKey: ['Popular'],
    queryFn: getPopularMovies,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const movies = data.results;

  return (
    <PageTemplate
      title="Popular"
      movies={movies}
      action={(movie) => (
        <AddToFavoritesIcon movie={movie} />
      )}
    />
  );
};

export default PopularMoviesPage;