const axios = require('axios')
require('dotenv').config()

const TOKEN = process.env.TOKEN
const DATA_API_URL = process.env.DATA_API_URL || 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.dsc'
const MY_API_URL = process.env.MY_API_URL || 'http://localhost:3000'

 
axios({
    method: 'GET',
    url: DATA_API_URL,
    headers: { Authorization: `Bearer ${TOKEN}` }
}).then(res => {
    const movies = res.data.results
    console.log('axios.then movies', movies)
    movies.forEach(movie => {
        axios({
            method: 'POST',
            url: `${MY_API_URL}/movies`,
            data: movie
        })
    })
}).catch(err => console.log('axios.catch err', err))