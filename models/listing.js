const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String

    },
    image: {
        filename: String,
        url: {
            type: String,
            default: "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YmV"
    }
},
    price: {
        type: Number
    },
    location: {
        type: String
    },
    country: {
        type: String
    }
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;