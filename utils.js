const excel = require('read-excel-file/node')
const mongoose = require('mongoose');
const fs = require('fs');
const { create } = require('domain');
const { createCipheriv } = require('crypto');

// Connecting to MongoDB
mongoose.connect(process.env.MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

// Creating schema for the database
const { Schema } = mongoose;
const personSchema = new Schema({
	name: String,
	email: { type: String, required: true },
	mobile: String,
	dob: Date,
	experience: String,
	title: String,
	location: String,
	postalAddress: String,
	currentEmployee: String,
	currentDesignation: String
});
const Person = mongoose.model('Person', personSchema);

const excelJsonMap = {
	"Name of the Candidate": 'name',
	"Email": 'email',
	"Mobile No.": 'mobile',
	"Date of Birth": 'dob',
	"Work Experience": 'experience',
	"Resume Title": 'title',
	"Current Location": 'location',
	"Postal Address": 'postalAddress',
	"Current Employer": 'currentEmployer',
	"Current Designation": 'currentDesignation'
}

const removeFile = filepath => {
	fs.unlink(filepath, err => {
		if (err)
			console.error(err);
	})
}

/**
 * Convert excel file to array of json
 * @param {String} file Path of the excel sheet
 * @returns json format of input excel sheet
 */
const getSheetData = async (file) => {
	const excelData = await excel(fs.createReadStream(file), { map: excelJsonMap });
	removeFile(file);
	return excelData.rows;
}

/**
 * It uploads person to the database
 * @param {Person} data Data of person to upload
 */
const createPerson = async (data) => {
	const newPerson = new Person(data);
	try {
		await newPerson.save(data);
	} catch (e) {
		console.error(e);
	}
}

/**
 * Add person to database if email is unique otherwise just leave it
 * @param {Person} data The data which is to be uploaded
 */
const uploadPersonData = async (data) => {
	try {
		const query = await Person.findOne({ email: data.email }).exec();
		if (query === null)
			await createPerson(data);
	} catch (e) {
		console.error(e);
	}
}

exports.getSheetData = getSheetData;
exports.uploadPersonData = uploadPersonData;