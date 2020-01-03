const {Schema, model} = require('mongoose')
const mongoose = require('../connection')


const votesSchema = new Schema({
    upvote: Boolean,
    movie: { type: Schema.Types.ObjectId, ref: 'Movie' }
  });
  const Vote = model('Vote', votesSchema);


  module.exports = Vote 