// app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Initialize the app
const app = express();
const port = 8081;

// Middleware to parse JSON data
app.use(bodyParser.json());

const mongoURI = 'mongodb+srv://heatherchengshi:R5FcEou5ZNUNTSZD@cluster0.f4tb3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(mongoURI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB connection error:", err));

// Import User model
require('./models/User');

// Define routes
const usersRouter = require('./routes/users');
app.use('/users', usersRouter);

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
