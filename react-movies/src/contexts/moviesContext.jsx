import React, { createContext, useState } from "react";

export const MoviesContext = createContext();

const MoviesContextProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [mustWatch, setMustWatch] = useState([]);

  
  const addToFavorites = (movieId) => {
    setFavorites((prevFavorites) => {
      if (!prevFavorites.includes(movieId)) {
        const updatedList = [...prevFavorites, movieId];
        console.log("Favorites List Updated:", updatedList);
        return updatedList;
      }
      return prevFavorites;
    });
  };

  
  const removeFromFavorites = (movieId) => {
    setFavorites((prevFavorites) => {
      return prevFavorites.filter((id) => id !== movieId);
    });
  };

  const addToMustWatch = (movieId) => {
    setMustWatch((prevMustWatch) => {
      if (!prevMustWatch.includes(movieId)) {
        const updatedList = [...prevMustWatch, movieId];
        console.log("Must Watch List Updated:", updatedList);
        return updatedList;
      }
      return prevMustWatch;
    });
  };

  return (
    <MoviesContext.Provider 
      value={{ 
        favorites, 
        addToFavorites,
        removeFromFavorites, 
        setFavorites, 
        mustWatch, 
        addToMustWatch 
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;