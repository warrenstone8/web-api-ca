import React, { useState, useEffect } from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRate from "@mui/icons-material/StarRate";
import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MovieReviews from "../movieReviews";

const MovieDetails = ({ movie }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [trailer, setTrailer] = useState(null);

  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${import.meta.env.VITE_TMDB_KEY}`
        );
        const data = await res.json();
        const officialTrailer = data.results.find(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );
        if (officialTrailer) {
          setTrailer(`https://www.youtube.com/embed/${officialTrailer.key}`);
        }
      } catch (error) {
        console.error("Error fetching trailer:", error);
      }
    };
    fetchTrailer();
  }, [movie.id]);

  
  const styles = {
    container: {
      padding: "16px",
      backgroundColor: "#f5f5f5",
      borderRadius: "8px",
    },
    heading: {
      marginBottom: "10px",
    },
    overview: {
      marginBottom: "20px",
    },
    paper: {
      display: "flex",
      flexWrap: "wrap",
      gap: "10px",
      padding: "16px",
      backgroundColor: "#fff",
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      marginBottom: "20px",
    },
    chip: {
      margin: "5px",
    },
    primaryChip: {
      fontWeight: "bold",
      backgroundColor: "#1976d2",
      color: "white",
    },
    trailerContainer: {
      marginTop: "20px",
      textAlign: "center",
    },
    trailerHeading: {
      marginBottom: "10px",
    },
    trailerFrame: {
      maxWidth: "100%",
      borderRadius: "8px",
    },
    reviewButton: {
      position: "fixed",
      bottom: "20px",
      right: "20px",
    },
    drawer: {
      padding: "20px",
    },
  };

  return (
    <Box sx={styles.container}>
      <Typography variant="h4" component="h2" sx={styles.heading}>
        {movie.title}
      </Typography>
      
      <Box sx={styles.overview}>
        <Typography variant="h5" component="h3" sx={styles.heading}>
          Overview
        </Typography>
        <Typography variant="body1" component="p">
          {movie.overview}
        </Typography>
      </Box>

      <Paper component="ul" sx={styles.paper}>
        <li>
          <Chip label="Genres" sx={styles.primaryChip} />
        </li>
        {movie.genres.map((g) => (
          <li key={g.name}>
            <Chip label={g.name} sx={styles.chip} />
          </li>
        ))}
      </Paper>

      <Paper component="ul" sx={styles.paper}>
        <Chip 
          icon={<AccessTimeIcon />} 
          label={`${movie.runtime} min.`} 
          sx={styles.chip}
        />
        <Chip 
          icon={<MonetizationIcon />} 
          label={`${movie.revenue.toLocaleString()}`} 
          sx={styles.chip}
        />
        <Chip 
          icon={<StarRate />} 
          label={`${movie.vote_average} (${movie.vote_count})`} 
          sx={styles.chip}
        />
        <Chip 
          label={`Released: ${movie.release_date}`} 
          sx={styles.chip}
        />
      </Paper>

      <Paper component="ul" sx={styles.paper}>
        <li>
          <Chip label="Production Countries" sx={styles.primaryChip} />
        </li>
        {movie.production_countries.map((country) => (
          <li key={country.name}>
            <Chip label={country.name} sx={styles.chip} />
          </li>
        ))}
      </Paper>

      {}
      {trailer && (
        <Box sx={styles.trailerContainer}>
          <Typography variant="h5" component="h3" sx={styles.trailerHeading}>
            Trailer
          </Typography>
          <iframe
            width="560"
            height="315"
            src={trailer}
            title="Movie Trailer"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={styles.trailerFrame}
          ></iframe>
        </Box>
      )}

      <Fab
        color="secondary"
        variant="extended"
        onClick={() => setDrawerOpen(true)}
        sx={styles.reviewButton}
      >
        <NavigationIcon sx={{ mr: 1 }} />
        Reviews
      </Fab>

      <Drawer 
        anchor="top" 
        open={drawerOpen} 
        onClose={() => setDrawerOpen(false)}
        sx={styles.drawer}
      >
        <MovieReviews movie={movie} />
      </Drawer>
    </Box>
  );
};

export default MovieDetails;
