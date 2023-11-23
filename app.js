const express = require('express')
const mongoose = require("mongoose")
 const dotenv = require('dotenv')
 dotenv.config()
const port =  process .env.PORT || 5000 
const app= express()
app.use(express.json())
const Products = require("./model/productSchma")
// const movie = require("./model/movie")
const connectDB = require("./db")

//get all product

app.get("/getallProudcts", async(req, res)=>{
  try {
    const products = await Products.find()
      return res.status(200).json({ message:"Product Successful recieved",products})
  }
  
  catch (error) {
    return res.status(500).json({msg: error.message})
  }
}),

 // get one product
app.get("/getoneProudcts/:id", async(req, res)=>{
  try {
    const id = req.params.id
    
    const product = await Products.findById(req.params.id)

    if(!product) 
      return res.status(404).json({msg: 'This product does not exist.'})

    return res.status(200).json(product)
    
  } catch (error) {
    
    return res.status(500).json({msg: error.message})
  }

})
// add new product

app.post("/addproduct", async(req, res)=>{
  try {
    const { title, price, description, category, image } = req.body;

      const newProduct = new Products({
        title, price, description, category, image
      })
      await newProduct.save()

      return res.status(200).json(newProduct)

  } catch (error) {
    return res.status(500).json({msg: error.message})
    
  }
})

// update a product
app.put("/updateproduct/:id", async(req, res)=>{
  try {

    const id = req.params.id

    const { title, price, description, category, image } = req.body;
  
      
  const product = await Products.findByIdAndUpdate({_id:id}, {
      title, price, description, category, image
    }, { new: true })

    if(!product) 
      return res.status(404).json({msg: 'This product does not exist.'})

    return res.status(200).json(product)

  } catch (error) {
    return res.status(500).json({msg: error.message})
    
  }
})


// delete a product 
app.delete("/deleteproduct/:id", async(req, res)=>{
  try {
    const id = req.params.id
    const product = await Products.findByIdAndDelete(req.params.id)

    if(!product) 
      return res.status(404).json({msg: 'This product does not exist.'})

    return res.status(200).json({msg: 'Delete Success!'})
  } catch (error) {
    return res.status(500).json({msg: error.message})
    
  }
})

app.listen(port, async()=>{
  await connectDB()
  console.log(`Server is running on port ${port}`)
})






























































































































































































































// // Get All Movies

// app.get("/api/allmovies", async(req, res)=>{
//   const Collections = await movie.find({})
//   return res.status(200).json({ message: " Movies collected Sucessfully",
//    count: Collections.length, Collections})
// });


// //  Get One Movie
// app.get("/api/getoneMovie/:id", async(req, res)=>{

//   try { 
//      const id = req.params.id
//   const Collections = await movie.findById(id)
//   return res.status(200).json({ message: " Movie collected Sucessfully", Collections})
    
//   } catch (error) {
//     return res.status(500).json({ message: error.message})
    
//   }

// });

// // Add New Movie

// app.post("/api/movie", async (req,res)=>{

//   try {console.log(req.body)
//   const{title, duration, genre} = req.body
//   const alreadyExisting = await movie.findOne({title})
//   if (alreadyExisting) { return res.status(500).json({message: "Movie Name already exist"})
    
//   }
//   const group = req.body
//   const addMovie = new movie({title, duration, genre})
//   await addMovie.save()

//   res.status(200).json({
//     message: " New movie Completely uploaded", group
//   })
    
//   } catch (error) {
//     return res.status(500).json({message:error.message})
    
//   }
  
// })


// // update all  movie data using put 

// app.put("/api/updateMovie/:id", async(req, res)=>{

//   try { 
//      const id = req.params.id

//      const{title, duration, genre} = req.body

//   // const updatemovie = await movie.findByIdAndUpdate({id},{title, duration, genre})
//   // findoneandupdate
//   const updatemovie = await movie.findByIdAndUpdate({_id:id},{title, duration, genre}, {new: true})
//   return res.status(200).json({ message: " Movie collected Sucessfully", updatemovie})
    
//   } catch (error) {
//     return res.status(500).json({ message: error.message})
    
//   }

// });

// app.delete("/appi/deleteMovie/:id", async(req,res)=>{
//   try {
//      const id = req.params.id
//      const deleted = await movie .findByIdAndDelete(id)
//      return res.status(200).json({ message: " Movie collected Sucessfully", deleted})
//   } 
//     catch (error) {
//       return res.status(500).json({ message: error.message})
      
    
//   }
// })





