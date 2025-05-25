import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import MovieReviewPage from "./pages/moviereviewpage";
import AddMovieReviewPage from "./pages/addMovieReviewPage";
import UpcomingMoviesPage from "./pages/upcomingmovies";
import PopularMoviesPage from "./pages/PopularMoviespage";
import CastAndCrewPage from "./pages/CastAndCrewPage"; 
import NowPlayingMoviesPage from "./pages/NowPlayingMoviesPage";
import SiteHeader from "./components/siteHeader"; 
import MoviesContextProvider from "./contexts/moviesContext";

import { AuthProvider, AuthContext } from "./context/AuthContext";  // import AuthContext and Provider
import Login from "./pages/Login";      // import your login page
import Signup from "./pages/Signup";    // import your signup page

// Create ProtectedRoute component inline here or you can move it to a separate file
const ProtectedRoute = ({ children }) => {
  const { user } = React.useContext(AuthContext);
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider> {/* Wrap the whole app in AuthProvider */}
        <BrowserRouter>
          <MoviesContextProvider>
            <SiteHeader />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              {/* Protect favorites route */}
              <Route
                path="/movies/favorites"
                element={
                  <ProtectedRoute>
                    <FavoriteMoviesPage />
                  </ProtectedRoute>
                }
              />

              <Route path="/reviews/:id" element={<MovieReviewPage />} />
              <Route path="/movies/:id" element={<MoviePage />} />
              <Route path="/movies/:id/cast" element={<CastAndCrewPage />} />
              <Route path="/reviews/form" element={<AddMovieReviewPage />} />
              <Route path="/movies/upcoming" element={<UpcomingMoviesPage />} />
              <Route path="/movies/popular" element={<PopularMoviesPage />} />
              <Route path="/movies/now-playing" element={<NowPlayingMoviesPage />} />

              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </MoviesContextProvider>
        </BrowserRouter>
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

const root = document.getElementById("root");

if (root) {
  createRoot(root).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error("check the index ");
}

