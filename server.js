const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();

// Connecting to MongoDB
mongoose.connect(process.env.MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

// Creating schema for the database
const { Schema } = mongoose;
const personSchema = new Schema({
	name: { type: String },
	email: { type: String, required: true },
	mobile: { type: String },
	dob: { type: Date },
	experience: { type: String },
	title: { type: String },
	location: { type: String },
	postalAddress: { type: String },
	currentEmployee: { type: String },
	currentDesignation: { type: String }
});



app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/views/index.html');
})

const port = process.env.PORT || 3000;
app.listen(port);