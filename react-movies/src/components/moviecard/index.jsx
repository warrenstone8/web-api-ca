import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import { Link } from "react-router-dom";  
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import FavoriteIcon from "@mui/icons-material/Favorite";
import img from "../../images/film-poster-placeholder.png";

export default function MovieCard({ movie, action }) { 
  const { favorites, addToFavorites } = useContext(MoviesContext);
  
  const isFavorite = favorites.includes(movie.id);

  const handleAddToFavorite = (e) => {
    e.preventDefault();
    addToFavorites(movie.id);
  };

  return (
    <Card sx={{ 
      display: "flex", 
      flexDirection: "column", 
      justifyContent: "space-between", 
      height: 520, 
      width: "100%",
    }}>
      <CardHeader
        avatar={
          isFavorite && (
            <Avatar sx={{ backgroundColor: "red" }}>
              <FavoriteIcon />
            </Avatar>
          )
        }
        title={<Typography variant="h6">{movie.title}</Typography>}
      />
      <CardMedia
        sx={{
          height: 300, 
          objectFit: "cover", 
        }}
        image={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : img}
      />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="h6">
              <CalendarIcon fontSize="small" /> {movie.release_date}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6">
              <StarRateIcon fontSize="small" /> {movie.vote_average}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions disableSpacing>
        {action && action(movie)}
        <Button variant="outlined" size="medium" color="primary">
          <Link to={`/movies/${movie.id}`} style={{ textDecoration: "none", color: "inherit" }}>
            More Info
          </Link>
        </Button>
        <Button variant="outlined" size="medium" color="secondary">
          <Link to={`/movies/${movie.id}/cast`} style={{ textDecoration: "none", color: "inherit" }}>
            View Cast & Crew
          </Link>
        </Button>
      </CardActions>
    </Card>
  );
}
