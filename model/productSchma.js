const mongoose = require("mongoose")


const productSchema = new mongoose.Schema({

  title:{
    unique:true,
    type: String,
    require: true
  },

  price:{
    type: String, 
  },

  description:{
    type: String,
    require: true
  },

  category:{
    type: String,
    require: true
  },
  image:{
    type: String,
    require: true
  },


}, {timestamps:true}) 
const Product = mongoose.model("product", productSchema)

module.exports= Product