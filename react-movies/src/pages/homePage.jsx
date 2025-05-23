import React from "react";
import { getMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardicons/addtoFavorites';

const HomePage = (props) => {

  const { data, error, isPending, isError } = useQuery({
    queryKey: ['discover'],
    queryFn: getMovies,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const movies = data.results;

  
  const handleAddToFavorites = (movie) => {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    
    const isAlreadyFavorite = favorites.some(fav => fav.id === movie.id);
    if (!isAlreadyFavorite) {
      favorites.push(movie);
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  };

  return (
    <PageTemplate
      title="Discover Movies"
      movies={movies}
      action={(movie) => (
        <AddToFavoritesIcon movie={movie} onClick={() => handleAddToFavorites(movie)} />
      )}
    />
  );
};

export default HomePage;
