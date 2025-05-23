import React from "react";
import { useNavigate } from "react-router-dom";

const CastCard = ({ actor }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/person/${actor.id}`);  
  };

  return (
    <div className="cast-card" onClick={handleClick} style={styles.card}>
      <img
        src={actor.profile_path 
          ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
          : "https://via.placeholder.com/200x300?text=No+Image"}
        alt={actor.name}
        style={styles.image}
      />
      <h3>{actor.name}</h3>
      <p>{actor.character}</p>
    </div>
  );
};

const styles = {
  card: {
    cursor: "pointer", 
    margin: "10px",
    textAlign: "center",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "10px",
    backgroundColor: "#fff",
    transition: "transform 0.3s ease",
  },
  image: {
    width: "100px",
    height: "150px",
    objectFit: "cover",
    borderRadius: "8px",
  },
};

export default CastCard;
