const express = require('express');
const async = require('async');
const fileUpload = require('express-fileupload');
require('dotenv').config();
const { getSheetData, uploadPersonData } = require('./utils');

const app = express();
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/views/index.html');
})

const fileuploadConfig = {
	useTempFiles: true, tempFileDir: './public/tmp', createParentPath: true
}

app.post('/upload', fileUpload(fileuploadConfig), async (req, res) => {
	try {
		const file = req.files.file;	// getting excel sheet to process data
		const fileData = await getSheetData(file.tempFilePath);	// extracting excel data
		await async.eachSeries(fileData, uploadPersonData);	//uploading data
		res.status(200).send('Upload successful');
	} catch (e) {
		console.log(e);
		res.status(500).send('Upload unsuccessful');
	}
})

const port = process.env.PORT || 3000;
app.listen(port);