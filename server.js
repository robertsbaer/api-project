const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const Movie = require('./models/movies')
const Vote = require('./models/votes')

require('dotenv').config()

const app = express()
// const port = 3000

let mongoURI = ""
if (process.env.NODE_ENV === "production") {
    mongoURI = process.env.DB_URL;
} else {
    mongoURI = "mongodb://localhost/DATABASE_URL"
}

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true});


app.use(bodyParser.json())
app.use(cors())

/* VOTES ROUTES */
app.get('/votes', (req, res) => {
    Vote.find()
        .then(votes => {
            res.send(votes)
        })
        .catch(err => {
            res.status(500).send(err)
        })
})
app.post('/votes', (req, res) => {
    console.log("POST /votes req.body", req.body)
    const upvote = req.body.upvote
    const movie= req.body.movie

    const createdVote = new Vote({
        upvote: upvote,
        movie: movie
    })
    createdVote.save()
        .then(vote => {
            res.send(vote)
        })
        .catch(err => {
            res.status(500).send(err)
        })
})
/* MOVIES ROUTES */


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
    const upvote = req.body.upvote
    const createdMovie = new Movie({
        title: title,
        release_date: new Date(release_date),
        popularity: popularity,
        upvote: upvote
    })
    createdMovie.save()
        .then(movie => {
            res.send(movie)
        })
        .catch(err => {
            res.status(500).send(err)
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
  app.set("port", process.env.PORT || 5050);
    app.listen(app.get("port"), () => {
    console.log(`✅ PORT: ${app.get("port")} 🌟`);
  });
});