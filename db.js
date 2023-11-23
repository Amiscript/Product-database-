
const mongoose = require ("mongoose")

// const URL ="mongodb+srv://Edison:test12345@cluster0.rpkpmwb.mongodb.net/movie=true&w=majority"

const connectDB = async()=>{
  mongoose.set("strictQuery", true)
  await mongoose.connect(process.env.MONGODB_URL)
  .then((res)=> { console.log("Connect to mongoose");})
  .catch((err)=>console.error(err))


}
module.exports = connectDB