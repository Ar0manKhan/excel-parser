const express = require('express');
const cors = require('cors');
const multer = require('multer');
require('dotenv').config();
const { getSheetData, uploadData } = require('./utils');

const app = express();
app.use(express.static(__dirname + '/public'));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
// Setting up multer
const upload = multer({ dest: './public/sheets/' });

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/views/index.html');
})

app.post('/upload', upload.single('file'), async (req, res) => {
	try {
		const file = req.file;	// getting excel sheet to process data
		// getting all data from excel sheet
		const fileData = await getSheetData(file.path);
		await uploadData(fileData);
		res.status(200).send('Upload successful');
	} catch (e) {
		res.status(500).send('Upload unsuccessful');
	}
})

const port = process.env.PORT || 3000;
app.listen(port);