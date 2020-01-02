const {Schema, model} = require('mongoose')

const movieSchema = new Schema({
    popularity: Number,
    title: String,
    release_date: Date
  });
  const Movie = model('Movie', movieSchema);


  module.exports = Movie
