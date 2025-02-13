const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 4,
  },
  email: {
    type: String,
    required: true,
    match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
  },
  city: {
    type: String,
    required: true,
    match: /^[a-zA-Z\s]+$/, // Allow only alphabets and spaces
  },
  website: {
    type: String,
    required: true,
    match: /^https?:\/\/[^\s/$.?#].[^\s]*$/, // Validate HTTP/HTTPS URLs
  },
  zipCode: {
    type: String,
    required: true,
    match: /^\d{5}-\d{4}$/, // Zip code format like 12345-1234
  },
  phone: {
    type: String,
    required: true,
    match: /^\d-\d{3}-\d{3}-\d{4}$/, // Phone format like 1-123-123-1234
  }
});

// Create and export the User model
module.exports = mongoose.model('User', userSchema);
