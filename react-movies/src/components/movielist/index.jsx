import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import MovieCard from "../movieCard"; 
import { Grid, Box, Typography } from "@mui/material";  

const MovieList = ({ movies, action }) => {
  const { favorites, addToFavorites } = useContext(MoviesContext);

  const styles = {
    root: {
      backgroundColor: "#E4E4DE",
      padding: "20px 0",
    },
    gridContainer: {
      marginTop: 2,
    },
    noMoviesMessage: {
      color: "#1B1B1B", 
      textAlign: "center",
      margin: "40px 0",
      padding: "20px",
      backgroundColor: "#C4C5BA", 
      borderRadius: "8px",
      borderLeft: "4px solid #595f39", 
    },
    listHeader: {
      color: "#1B1B1B", 
      borderBottom: "2px solid #595f39", 
      paddingBottom: "10px",
      marginBottom: "20px",
    }
  };

  let movieCards = movies?.map((movie) => (
    <Grid key={movie.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
      <MovieCard key={movie.id} movie={movie} action={action} />
    </Grid>
  ));

  return (
    <Box sx={styles.root}>
      <Typography variant="h4" component="h2" sx={styles.listHeader}>
        Discover Movies
      </Typography>
      
      {movieCards?.length > 0 ? (
        <Grid container spacing={2} justifyContent="center" sx={styles.gridContainer}>
          {movieCards}
        </Grid>
      ) : (
        <Typography variant="h5" sx={styles.noMoviesMessage}>
          No movies found that match your criteria.
        </Typography>
      )}
    </Box>
  );
};

export default MovieList;
