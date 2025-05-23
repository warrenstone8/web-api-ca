import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

const FilterMoviesCard = ({ onUserInput, titleFilter, genreFilter, genres = [] }) => {
 
  const cardStyles = {
    marginBottom: "20px",
    padding: "16px",
    backgroundColor: "#f5f5f5",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  };

  
  console.log("Genres:", genres);

  return (
    <Card sx={cardStyles}>
      <CardContent>
        <Typography variant="h6" component="div">
          Filter Movies
        </Typography>

        <TextField
          label="Title Search"
          variant="outlined"
          fullWidth
          margin="normal"
          value={titleFilter}
          onChange={(e) => onUserInput("title", e.target.value)}
        />

        <TextField
          label="Genre"
          variant="outlined"
          fullWidth
          select
          margin="normal"
          value={genreFilter}
          onChange={(e) => onUserInput("genre", e.target.value)}
        >
          {genres.length > 0 ? (
            genres.map((genre) => (
              <MenuItem key={genre.id} value={genre.id}>
                {genre.name}
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled>No genres available</MenuItem>
          )}
        </TextField>
      </CardContent>
    </Card>
  );
};

export default FilterMoviesCard;
