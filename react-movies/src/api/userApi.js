const API_SERVER_URL = "http://localhost:3000"; 

export const getFavourites = async (userId) => {
  const response = await fetch(`${API_SERVER_URL}/api/favourites/user/${userId}`);
  if (!response.ok) {
    if (response.status === 404) { 
      return [];
    }
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

export const addFavourite = async (userId, movieId) => {
  const response = await fetch(`${API_SERVER_URL}/api/favourites`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
     
    },
    body: JSON.stringify({ movieId: movieId }),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || `Failed to add favourite: status ${response.status}`);
  }
  return response.json();
};

export const removeFavourite = async (userId, movieId) => {
  const response = await fetch(`${API_SERVER_URL}/api/favourites/${movieId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      
    },
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || `Failed to remove favourite: status ${response.status}`);
  }
  return response.json();
};

export const getWatchlist = async (userId) => {
  const response = await fetch(`${API_SERVER_URL}/api/watchlist/user/${userId}`);
  if (!response.ok) {
    if (response.status === 404) { 
      return [];
    }
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

export const addWatchlist = async (userId, movieId) => {
  const response = await fetch(`${API_SERVER_URL}/api/watchlist`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      
    },
    body: JSON.stringify({ movieId: movieId }),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || `Failed to add to watchlist: status ${response.status}`);
  }
  return response.json();
};

export const removeWatchlist = async (userId, movieId) => {
  const response = await fetch(`${API_SERVER_URL}/api/watchlist/${movieId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || `Failed to remove from watchlist: status ${response.status}`);
  }
  return response.json();
};
