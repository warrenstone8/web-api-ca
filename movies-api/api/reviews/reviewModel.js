import mongoose from 'mongoose';
const ReviewSchema = new mongoose.Schema({
  
  movieId: {
    type: Number,
    required: true,
  },
  
  userId: {
    type: String, 
    required: true,
  },
  
  rating: {
    type: Number,
    required: true,
    min: 1, // Minimum rating value
    max: 5, // Maximum rating value
  },
  
  comment: {
    type: String,
    required: true,
    trim: true, 
    minlength: 10, 
  },
  // Timestamp for when the review was created
  createdAt: {
    type: Date,
    default: Date.now, 
  },
  
});


ReviewSchema.index({ movieId: 1, userId: 1 }, { unique: true });


const Review = mongoose.model('Review', ReviewSchema);

export default Review;