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
    console.log('inicio register');
    // Extract user data from the request body
    const userData = req.body;

    // Create a new user using the User model
    const newUser = new User(userData);
    console.log('new user preenchido');
    await newUser.save();
    console.log('newUser criado');
    const secretKey = crypto.randomBytes(32).toString('hex');

    // Generate a token for the new user (you may use JWT or any other token generation mechanism)
    const token = jwt.sign({userId: newUser._id}, secretKey);
    console.log('token criado');
    // Return the new user data along with the token
    res.status(200).json({token});
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({error: 'Internal Server Error'});
  }
});

app.get('/users/:userId', async (req, res) => {
  try {
    const {userId} = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(500).json({message: 'user not found'});
    }

    return res.status(200).json({user});
  } catch (error) {
    res.status(500).json({message: 'Error fetching the user details'});
  }
});

app.post('/login', async (req, res) => {
  try {
    const {email, password} = req.body;

    const user = await User.findOne9({email});
    if (!user) {
      return res.status(401).json({message: 'Invalid email or password'});
    }

    if (user.password !== password) {
      return res.status(401).json({message: 'Invalide password'});
    }

    const secretKey = crypto.randomBytes(32).toString('hex');

    const token = jwt.sign({userId: user._id}, secretKey);

    return res.status(200).json({token});
  } catch (error) {
    res.status(500).json({message: 'login failed'});
  }
});

app.get('/matches', async (req, res) => {
  try {
    const {userId} = req.query;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({message: 'User not found'});
    }

    let filter = {};

    if (user.gender === 'Men') {
      filter.gender = 'Women';
    } else if (user.gender === 'Women') {
      filter.gender = 'Men';
    }
    let query = {
      _id: {$ne: userId},
    };

    if (user.type) {
      filter.type = user.type; // Assuming user.type is a single value
    }

    const currentUser = await User.findById(userId)
      .populate('matches', '_id')
      .populate('likedProfiles', '_id');

    const friendsIds = currentUser.matches.map(friend => friend._id);

    const crushIds = currentUser.likedProfiles.map(crush => crush._id);

    const matches = await User.find(filter)
      .where('_id')
      .nin([userId, ...friendsIds, ...crushIds]);

    return res.status(200).json({matches});
  } catch (error) {
    console.error('Error fetching matches:', error);
    res.status(500).json({message: 'Internal server error'});
  }
});

app.post('/like-profile', async (req, res) => {
  try {
    const {userId, likedUserId, image, comment} = req.body;

    // Update the liked user's receivedLikes array
    await User.findByIdAndUpdate(
      likedUserId,
      {
        $push: {
          receivedLikes: {
            userId: userId, // Corrigindo a chave userId aqui
            image: image,
            comment: comment,
          },
        },
      },
      {new: true},
    );
    // Update the user's likedProfiles array
    await User.findByIdAndUpdate(userId, {
      $push: {
        likedProfiles: likedUserId,
      },
    });

    res.status(200).json({message: 'Profile liked successfully'});
  } catch (error) {
    console.error('Error liking profile:', error);
    res.status(500).json({message: 'Internal server error'});
  }
});

app.get('/received-likes/:userId', async (req, res) => {
  try {
    const {userId} = req.params;

    const likes = await User.findById(userId)
      .populate('receivedLikes.userId', 'firstName imageUrls prompt')
      .select('receivedLikes');

    res.status(200).json({receivedLikes: likes.receivedLikes});
  } catch (error) {
    console.error('Error fetching received likes:', error);
    res.status(500).json({message: 'Internal server error'});
  }
});

app.post('/create-match', async (req, res) => {
  try {
    const {currentUserId, selectedUserId} = req.body;

    //update the selected user's crushes array and the matches array
    await User.findByIdAndUpdate(selectedUserId, {
      $push: {matches: currentUserId},
      $pull: {likedProfiles: currentUserId},
    });

    //update the current user's matches array recievedlikes array
    await User.findByIdAndUpdate(currentUserId, {
      $push: {matches: selectedUserId},
    });

    // Find the user document by ID and update the receivedLikes array
    const updatedUser = await User.findByIdAndUpdate(
      currentUserId,
      {
        $pull: {receivedLikes: {userId: selectedUserId}},
      },
      {new: true},
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
  }


    // If the user document was successfully updated
    res.status(200).json({message: 'ReceivedLikes updated successfully'});

  } catch (error) {
    res.status(500).json({message: 'Error creating a match', error});
  }
});

app.get('/get-matches/:userId', async (req, res) => {
  try {
    const {userId} = req.params;

    // Find the user by ID and populate the matches field
    const user = await User.findById(userId).populate(
      'matches',
      'firstName imageUrls',
    );

    if (!user) {
      return res.status(404).json({message: 'User not found'});
    }

    // Extract matches from the user object
    const matches = user.matches;

    res.status(200).json({matches});
  } catch (error) {
    console.error('Error getting matches:', error);
    res.status(500).json({message: 'Internal server error'});
  }
});