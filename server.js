const express = require('express');
// const myApp = require('./myApp');
const app = express();

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/views/index.html');
})

const port = process.env.PORT || 3000;
app.listen(port);