import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import moviesRouter from './api/movies/index.js';
import reviewsRouter from './api/reviews/index.js';
import favouritesRouter from './api/favourites/index.js'; 
import watchlistRouter from './api/watchlist/index.js';   
import initDb from './db/index.js';
const app = express();
const port = process.env.PORT || 3000;
initDb(process.env.MONGO_DB);

app.use(cors());
app.use(express.json());
app.use('/api/movies', moviesRouter);
app.use('/api/reviews', reviewsRouter);
app.use('/api/favourites', favouritesRouter);
app.use('/api/watchlist', watchlistRouter);   
app.use((err, req, res, next) => {
  if (process.env.NODE_ENV === 'production') {
    res.status(500).send('Server Error');
  } else {
    console.error('Unhandled Server Error:', err.stack);
    res.status(500).send(err.stack);
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
