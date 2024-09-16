const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Listing = require('./models/listing.js');
const path = require('path');
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

// connect to MongoDB
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main().then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log(err);
})
async function main() {
    await mongoose.connect(MONGO_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname,"/public")));


//index route
app.get("/listings", async (req, res) => {
    let allListings = await Listing.find({});
    res.render("./listings/index.ejs", {allListings});
})

// Add Route
app.get("/listings/new", async (req, res) => {
    res.render("./listings/new.ejs");
})

// Create Route
app.post("/listings", async (req, res) => {
    const newListing = new Listing(req.body.listing)
    await newListing.save();
    res.redirect("/listings");
})

// Show Route
app.get("/listings/:id", async (req, res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("./listings/show.ejs", {listing});
})

// edit route

app.get("/listings/:id/edit", async (req, res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("./listings/edit.ejs", {listing});
})

// update route
app.put("/listings/:id", async (req, res) => {
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    res.redirect(`/listings/${id}`);
})

// delete route
app.delete("/listings/:id", async (req, res) => {
    let {id} = req.params;
    let deletedList = await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
})
// app.get("/testListing", async (req, res) => {
//     let sampleListing = new Listing({
//         title: "My new villa",
//         description: "By the beach",
//         price: 1200,
//         location: "Cape Town",
//         country: "South Africa"
//     });
//     await sampleListing.save();
//     console.log("Sample was saved");
//     res.send("Listing saved");
// })
app.get('/', (req, res) => {
    res.send("Working!");
})

app.listen(8080, () => {
    console.log('Server is running on port 8080');
})