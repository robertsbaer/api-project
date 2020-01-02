const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const Movie = require('./models/movies')
require('dotenv').config()

const app = express()
const port = 3001
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true});

app.use(bodyParser.json())
app.use(cors())


app.get('/movies', (req, res) => {
    Movie.find()
        .then(movies => {
            res.send(movies)
        })
        .catch(err => {
            res.status(500).send(err)
        })
})

/**
 * create a new movie
 */
app.post('/movies', (req, res) => {
    console.log("POST /movies req.body", req.body)
    const title = req.body.title
    const release_date = req.body.release_date
    const popularity = req.body.popularity
    const createdMovie = new Movie({
        title: title,
        release_date: new Date(release_date),
        popularity: popularity
    })
    createdMovie.save()
        .then(movie => {
            res.send(movie)
        })
})

app.get('/movies/:id', (req, res) => {
    console.log('GET /movies/:id req', req)
    const id = req.params.id
    Movie.findById(id)
    .then(movie => {
        res.send(movie)
    })
    .catch(err => {
        res.status(500).send(err)
    })
})


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  app.listen(port, () => console.log(`Example app listening on port ${port}!`))
});