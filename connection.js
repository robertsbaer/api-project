const mongoose = require('mongoose')
//take this out?
// const mongoURL = 'mongodb://localhost/breweries'
let mongoURI = "";
if (process.env.NODE_ENV === "production") {
    mongoURI = process.env.DB_URL;
  } else {
    mongoURI = "mongodb://localhost/movies";
  }
mongoose.Promise = Promise
//but then mongoURL is not defined, so take this out too?
mongoose.connect(mongoURI, {
    useNewUrlParser : true,
    useUnifiedTopology: true
})
    .then(feedback => console.log('connected'))
    .catch( error => console.log('errrrorrr', error))
module.exports = mongoose