const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
     
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6 
  },
  age: {
    type: Number,
    min: 13 
  },
  number: {
    type: Number,
    
  },
  isAdmin:{
    type:Boolean,
    default:false
  },
  weight: {
    type: Number,
    default: 0 // Enforce minimum weight value for validity
  },
  height: {
    type: Number,
    default: 0 // Enforce minimum weight value for validity
  },
  goals: {
    type: String,
    default:'Weight Loss' // enum: ['Weight Loss', 'Muscle Gain', 'General Fitness'] // Predefined goals
  },
  profile: {
    type: String, 
  },
  createdAt: {
    type: Date,
    default: Date.now
  },   
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Apply password hashing middleware before saving a new user
const User=mongoose.model('User', userSchema);

module.exports = User
