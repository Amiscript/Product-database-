const express = require('express')
const mongoose = require("mongoose")
 const dotenv = require('dotenv')
 dotenv.config()
const port =  process .env.PORT || 5000 
const app= express()
app.use(express.json())
const Products = require("./model/productSchma")
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
