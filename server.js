require('dotenv').config()
const express = require('express')
// const mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require('cors')
const cloudinary = require('cloudinary')
const uploadImages = require('./uploadImages')

const app = express()

const PORT = process.env.PORT || 3000

// midleware
app.use(cors())
app.use(express.json())
app.use(morgan("dev"))




// routes
app.get('/gallery',async (req, res) => {
    try {
        const images = await uploadImages('Home/m')
        console.log(images)
        res.json(images)
        
      } catch (error) {
        console.error(error)
        res.status(500).send(error.message)
      }
})

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
})


// const images = await getImagesFromCloudinary('Home/m');

// images.map(async image => {
//     const newImage = new Images({
//         title: image.public_id,
//         url: image.secure_url,
//         description: image.description || '',
//     });
//     await newImage.save();
// });
