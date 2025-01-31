const express = require('express');
const mongoose = require('mongoose');
const Restaurant = require('./models/Restaurant');
const app = express();
const port = 3000;

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://heatherchengshi:y9oHSSjIHfihnuHG@cluster0.f4tb3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));


//  Middleware to parse JSON requests
app.use(express.json());

// Get all restaurants
app.get('/restaurants', async (req, res) => {
    try{
        const sortBy = req.query.sortBy || 'ASC';
        const restaurants = await Restaurant.find().sort({ restaurant_id: sortBy === 'ASC' ? 1 : -1 });
        res.json(restaurants);
    } catch (err){
        res.status(500).send(err);
    }
});

// Get restaurants by cuisine
app.get('/restaurants/cuisine/:cuisine', async (req, res) => {
    try {
      const { cuisine } = req.params;
      const restaurants = await Restaurant.find({ cuisine: cuisine });
      res.json(restaurants);
    } catch (err) {
      res.status(500).send(err);
    }
  });

// Get restaurants where all cuisines are Delicatessen and city is not Brooklyn
app.get('/restaurants/Delicatessen', async (req, res) => {
    try {
      const restaurants = await Restaurant.find({
        cuisine: 'Delicatessen',
        city: { $ne: 'Brooklyn' },
      }).sort({ name: 1 }).select('cuisine name city');
      res.json(restaurants);
    } catch (err) {
      res.status(500).send(err);
    }
  });

// start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

