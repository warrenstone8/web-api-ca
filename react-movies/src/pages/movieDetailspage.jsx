import React from "react";
import { useParams } from 'react-router';
import MovieDetails from "../components/movieDetails/";
import PageTemplate from "../components/templateMoviePage";
import { getMovie } from '../api/tmdb-api'; 
import { useQuery } from '@tanstack/react-query'; 
import Spinner from '../components/spinner'; 

const MoviePage = (props) => {
const { id } = useParams();

const { data, error, isPending, isError } = useQuery({
queryKey: ['movie', { id: id }], 
queryFn: getMovie, 
 });

if (isPending) {
return <Spinner />;
 }

if (isError) {
return <h1>{error.message}</h1>;
 }

return (
<>
{data ? (
<PageTemplate movie={data}>
<MovieDetails movie={data} />
</PageTemplate>
 ) : (
<p>Waiting for movie details...</p>
 )}
</>
 );
};
export default MoviePage