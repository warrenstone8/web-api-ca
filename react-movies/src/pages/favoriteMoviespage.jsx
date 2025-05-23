import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "@tanstack/react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from '../components/spinner';
import RemoveFromFavorites from "../components/cardIcons/removeFromFavorites";
import WriteReview from "../components/cardIcons/writeReview";

const FavoriteMoviesPage = () => {
  const { favorites: movieIds } = useContext(MoviesContext);


  const favoriteMovieQueries = useQueries({
    queries: movieIds.map((movieId) => ({
      queryKey: ['movie', { id: movieId }],  
      queryFn: getMovie,
      enabled: !!movieId
    }))
  });

  const isPending = favoriteMovieQueries.some((query) => query.isPending);
  
  const isError = favoriteMovieQueries.some((query) => query.isError);

  if (movieIds.length === 0) {
    return <h2>No favorite movies</h2>;
  }

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <div>Error loading favorite movies</div>;
  }


  const movies = favoriteMovieQueries
    .filter((q) => q.data)
    .map((q) => {
      const movie = q.data;
      return {
        ...movie,
        genre_ids: movie.genres ? movie.genres.map((g) => g.id) : []
      };
    });

  return (
    <PageTemplate
      title="Favorite Movies"
      movies={movies}
      action={(movie) => (
        <>
          <RemoveFromFavorites movie={movie} />
          <WriteReview movie={movie} />
        </>
      )}
    />
  );
};

export default FavoriteMoviesPage;