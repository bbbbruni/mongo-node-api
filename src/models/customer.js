const mongoose = require('mongoose');

const { Schema } = mongoose;

const customerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: false,
  },
  roles: {
    type: String,
    required: true,
    enum: ['user', 'admin'],
    default: 'user',
  }
});

module.exports = mongoose.model('Customer', customerSchema);