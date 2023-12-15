// Imports of the required packages
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();
const http = require('http');
const fs = require('fs');

// Import functions from the functions folder
const placeHolder = require('./functions/placeHolder.js');
const calc = require('./functions/calcFn.js');
const locationFunction = require('./functions/locationFunction.js');

// Configuration for the port
const port = 9999;

// Configuration for the express app
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuration for the cors
const corsOptions = {
	origin: 'http://localhost:5173',
	methods: 'GET,POST',
	Credentials: true,
};

app.options('*', cors(corsOptions));
app.use(cors(corsOptions));

// Configuration for the dotenv
dotenv.config();

// Configuration for the routes
app.post('/api/', async (req, res) => {
	console.log(req.body);
	// Example of how to use a function from the functions folder
	const placeHolderFunction = await placeHolder.placeholder();
	console.log(placeHolderFunction);
});

/*
app.post('/api/test', async (req, res) => {
	const location = req.body.location;
	console.log('Message:', location);
	res.status(200).send({ location: location });
});
*/

app.post('/api/location/', async (req, res) => {
	const location = req.body.location;
	await locationFunction.locationFunction(location);
    res.status(200).send({ location: location });
});

app.post('/api/calc', async (req, res) => {
	// example code for how to use the calcFn.js file
	const cord1 = req.body.cord1;
	const cord2 = req.body.cord2;
	const cord3 = req.body.cord3;
	const cord4 = req.body.cord4;
	console.log('cord1:', cord1);
	console.log('cord2:', cord2);
	console.log('cord3:', cord3);
	console.log('cord4:', cord4);
	const distance = await calc.calcDistance(cord1, cord2, cord3, cord4);
	const shortDistance = Math.floor(distance);
	console.log(`Distance(decimal): ${distance}km`);
	console.log(`Distance: ${shortDistance}km`);
	res.status(200).send({ distance: distance });
});

// Configuration for the server
http.createServer(app).listen(port, () => {
	console.log(`Server is running on port: ${port}`);
});
