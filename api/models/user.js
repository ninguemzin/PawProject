const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  FirstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  datingPrefences: {
    type: String,
    required: true,
  },
  lookingFor: {
    type: String,
    required: true,
  },
  imageUrls: [
    {
      type: String,
    },
  ],
  prompts: [
    {
      question: {
        type: String,
        required: true,
      },
      answer: {
        type: String,
        required: true,
      },
    },
  ],
  likedProfiles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  receivedLikes: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      Comment: {
        type: String,
      },
    },
  ],
  matches: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  blockedUsers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});

const User = mongoose.model('User', userSchema);

module.exports = User;