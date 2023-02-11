require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const cloudinary = require('cloudinary').v2


const app = express()

const PORT = process.env.PORT || 3000



cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  })


// midleware
app.use(cors())
app.use(express.json())
app.use(morgan("dev"))




// routes
app.get('/', (req, res) => {
  res.send("Welcome to Backend")
})


app.get('/gallery', async (req, res) => {
    
    try {
         await cloudinary.search.expression('folder:m')
        
        .sort_by('public_id', 'desc')
        .max_results(30)
        .execute()
        .then( files => {
            const images = files.resources.map(file => {
                return {
                    url: file.secure_url,
                    name: file.filename
                } 
            } )
            res.json(images)
            // console.log(files)
        } )
    }catch(error){
        console.error(error)
    }

})

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
})

