require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const cloudinary = require('cloudinary')


const app = express()

const PORT = process.env.PORT || 3000

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
  })

async function getImagesFromCloudinary(collectionName) {
    try {
      const result = await cloudinary.api.resources({ type: 'upload', max_results: 500, prefix: collectionName + '/' });
      console.log(result.resources)
      return result.resources;
    } catch (error) {
      console.error(error);
    }
  }

// midleware
app.use(cors())
app.use(express.json())
app.use(morgan("dev"))




// routes
app.get('/', (req, res) => {
  res.send("Welcome to Backend")
})


app.get('/gallery', async (req, res) => {
   
        const images = await getImagesFromCloudinary('Home/m')
        console.log(images)
        res.send(images)
        
    })

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
})

