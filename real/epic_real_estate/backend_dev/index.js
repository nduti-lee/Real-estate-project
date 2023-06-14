const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const authController = require('./controllers/authController')
const dotenv = require('dotenv').config()
const app = express()
const propertyController = require('./controllers/propertyController')
const uploadController = require('./controllers/uploadController')
const commentController = require('./controllers/commentController')
const yachtController = require('./controllers/yatchController')
const userController = require('./controllers/userController')
const yatcht = require('./models/Yatcht')


//mongoose connection to server function
const connectToMongo = async () => {
    try {
      mongoose.set("strictQuery", false);
      mongoose.connect(process.env.MONGO_URL);
      console.log("Connected to MongoDB Server Successfully!");
      app.use('/images', express.static('public/images'))
    } catch (error) {
      console.log(error);
    }
  };

connectToMongo()
// mongoose.set('strictQuery', false)
// mongoose.connect(process.env.MONGO_URL, () => console.log("MongoDB Started Successfully"))




app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/images', express.static('public/images'))

app.use("/auth", authController);
app.use("/property", propertyController);
app.use("/yacht", yachtController);
app.use('/upload', uploadController)
app.use('/user', userController)
app.use('/comment', commentController)
app.use('/yatcht', yatcht)

// starting server
const port = process.env.PORT || 5000;

//starting server
app.listen(process.env.PORT, () => console.log("Server Started successfully"))