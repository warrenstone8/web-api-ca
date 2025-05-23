import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getMovieCredits } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import CastCard from "../components/CastCard";

const CastCrewPage = () => {
  const { id } = useParams(); 
  const navigate = useNavigate(); 

  
  const { data, error, isPending, isError } = useQuery({
    queryKey: ["movieCredits", id],
    queryFn: () => getMovieCredits(id), 
  });

  
  if (isPending) return <Spinner />;

  
  if (isError) return <h1>{error.message}</h1>;

  
  const directors = data.crew.filter(
    (crewMember) => crewMember.job === "Director"
  );

  
  const topCast = Array.from(
    new Map(data.cast.map((actor) => [actor.id, actor])).values()
  )
    .filter((actor) => actor.profile_path)
    .slice(0, 20);

  return (
    <div style={styles.castCrewContainer}>
      {}
      <div className="cast-crew-header">
        <h2>Cast and Crew</h2>
        <button 
          className="back-button"
          onClick={() => navigate(`/movies/${id}`)} 
        >
          Back to Movie
        </button>
      </div>

      {}
      {directors.length > 0 && (
        <div className="director-section">
          <h3>Director{directors.length > 1 ? "s" : ""}</h3>
          <div className="director-list">
            {directors.map((director) => (
              <div key={director.id} className="director-card">
                {director.profile_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w200${director.profile_path}`}
                    alt={director.name}
                    className="director-image"
                  />
                ) : (
                  <div className="no-image">No Image</div>
                )}
                <h4>{director.name}</h4>
              </div>
            ))}
          </div>
        </div>
      )}

      {}
      <div className="cast-section">
        <h3>Top Cast</h3>
        <div className="cast-list">
          {topCast.map((actor) => (
            
            <CastCard key={actor.id} actor={actor} />
          ))}
        </div>
      </div>
    </div>
  );
};


const styles = {
  castCrewContainer: {
    padding: "20px",
    backgroundColor: "#f5f5f5",
  },
};

export default CastCrewPage;
