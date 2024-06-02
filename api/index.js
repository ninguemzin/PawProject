const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const crypto = require('crypto');

const app = express();
const port = 4000;
const cors = require('cors');

const http = require('http').createServer(app);
const io = require('socket.io')(http);

const jwt = require('jsonwebtoken');

app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.json());

mongoose
  .connect('mongodb+srv://ragazzi:ragazzi@cluster0.psqa3nj.mongodb.net/')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(error => {
    console.log('Error connecting to MongoDB', error);
  });

app.listen(port, () => {
  console.log('Server is running on 4000');
});

const User = require('./models/user');

app.post('/register', async (req, res) => {
  try {
    
    console.log("inicio register");
    // Extract user data from the request body
    const userData = req.body;

    // Create a new user using the User model
    const newUser = new User(userData);
    console.log("new user preenchido");
    await newUser.save();
    console.log ("newUser criado");
    const secretKey = crypto.randomBytes(32).toString('hex');

    // Generate a token for the new user (you may use JWT or any other token generation mechanism)
    const token = jwt.sign({userId: newUser._id}, secretKey);
    console.log("token criado");
    // Return the new user data along with the token
    res.status(200).json({token});
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({error: 'Internal Server Error'});
  }
});