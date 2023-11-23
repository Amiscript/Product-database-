const mongoose = require("mongoose")

const movieSchema = new mongoose.Schema({

  title:{
    unique:true,
    type: String,
    require: true
  },

  duration:{
    type: String, 
  },

  genre:{
    type: String,
    require: true
  },


}, {timestamps:true}) 
const movie = mongoose.model("movie", movieSchema)

module.exports= movie 