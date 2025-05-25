import mongoose from 'mongoose';
const FavouriteSchema = new mongoose.Schema({
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
FavouriteSchema.index({ userId: 1, movieId: 1 }, { unique: true });

const Favourite = mongoose.model('Favourite', FavouriteSchema);

export default Favourite;
