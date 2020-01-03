const mongoose = require('../connection')

const Movies = require('../models/movies')
const MovieData = require('./data/movieData.json')

const SeedMovieData = MovieData.map(movie => {
    const movieInfo = {}

    movieInfo.popularity = movie.popularity,
    movieInfo.title = movie.title,
    movieInfo.release_date = movie.release_date

    return movieInfo
})

Movies.deleteMany({}).then(() => {
    console.log('Everything has been deleted!')
    Movies.create(SeedMovieData)
    .then(movieInfo => {
        console.log(movieInfo)
    })
    .catch(err =>{
        console.log(err)
    })
})