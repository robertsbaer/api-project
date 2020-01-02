const axios = require('axios')
const DATA_API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.dsc'
 
axios({
    method: 'GET',
    url: DATA_API_URL,
    //headers: { Authorization: `Bearer ${TOKEN}` }
}).then(res => {
    const movie = res.data.results
    console.log('axios.then movie', movie)
}).catch(err => console.log('axios.catch err', err))