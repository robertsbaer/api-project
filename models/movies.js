const {Schema, model} = require('mongoose')

const movieSchema = new Schema({
    popularity: Number,
    title: String,
    release_date: Date,
    upvote: { type: Schema.Types.ObjectId, ref: 'Vote' }
  });
  const Movie = model('Movie', movieSchema);


  module.exports = Movie
