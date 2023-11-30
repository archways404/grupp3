// Imports of the required packages
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();
const http = require('http');
const fs = require('fs');

// Import functions from the functions folder
const placeHolder = require('./functions/placeHolder.js');

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

app.post('/api/test', async (req, res) => {
	const test = req.body.test;
	console.log(test);
	res.status(200).send({ test: test });
});

// Configuration for the server
http.createServer(app).listen(port, () => {
	console.log(`Server is running on port: ${port}`);
});
