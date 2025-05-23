import React, { useState } from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import MovieList from "../movieList";
import Grid from "@mui/material/Grid";

function MovieListPageTemplate({ movies, title, action }) {
  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("");
  const genreId = Number(genreFilter);

  let displayedMovies = movies
    .filter((m) => m.title.toLowerCase().includes(nameFilter.toLowerCase()))
    .filter((m) => (genreId > 0 ? m.genre_ids.includes(genreId) : true));

  const handleChange = (type, value) => {
    if (type === "name") setNameFilter(value);
    else setGenreFilter(value);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Header title={title} />
      </Grid>
      <Grid container spacing={3}>  

        <Grid item xs={12} sm={6} md={4} lg={3} xl={2} sx={{ padding: "20px" }}>
          <FilterCard
            onUserInput={handleChange}
            titleFilter={nameFilter}
            genreFilter={genreFilter}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={8} lg={9} xl={10}>
          <MovieList action={action} movies={displayedMovies} />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default MovieListPageTemplate;
