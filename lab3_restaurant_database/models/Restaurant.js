const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    restaurant_id: {type: Number, required: true},
    city: {type: String, requied: true},
    name: {type: String, requied: true},
    cuisine: {type: String, required: true},

}, {timestamps: true});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;