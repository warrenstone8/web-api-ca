import fetch from 'node-fetch';

export const getMovies = async () => {
    const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=1`
    );

    if (!response.ok) {
        const errorData = await response.json(); 
        throw new Error(errorData.message || 'TMDB API request failed');
    }

    return await response.json();
};

