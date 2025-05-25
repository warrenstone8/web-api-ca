import mongoose from 'mongoose';
const WatchlistSchema = new mongoose.Schema({
  userId: {
    type: String, 
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
WatchlistSchema.index({ userId: 1, movieId: 1 }, { unique: true });
const Watchlist = mongoose.model('Watchlist', WatchlistSchema);

export default Watchlist;