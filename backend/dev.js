// Imports of the required packages
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();
const http = require('http');
const fs = require('fs');

// Import functions from the functions folder
const placeHolder = require('./functions/placeHolder.js');
const calcFn = require('./functions/calcFn.js');
const locationFn = require('./functions/locationFn.js');
const searchFn = require('./functions/searchFn.js');
const currencyFn = require('./functions/currencyFn.js');

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

app.post('/api/sendLocation', async (req, res) => {
	const location = req.body.location;
	const cordinates = await locationFn.getCordinates(location);
	console.log('Message:', cordinates);
	res.status(200).send({ cordinates: cordinates });
});

app.post('/api/Search', async (req, res) => {
	const searchValue = req.body.searchValue;
	console.log('searchValue:', searchValue);

	const exchangeRate = await currencyFn.getConverstionRateToUSD();
	console.log('exchangeRate:', exchangeRate);

	const products = await searchFn.convertProducts();

	if (searchValue === null) {
		const updatedProducts = searchFn.convertPrice(products, exchangeRate);
		console.log(updatedProducts);

		res.status(200).send({ updatedProducts: products });
	} else {
		const product_name = searchFn.getProductByName(products, searchValue);
		console.log(product_name);

		const updatedProducts = searchFn.convertPrice(product_name, exchangeRate);
		console.log(updatedProducts);

		res.status(200).send({ updatedProducts: updatedProducts });
	}
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
	const distance = await calcFn.calcDistance(cord1, cord2, cord3, cord4);
	const shortDistance = Math.floor(distance);
	console.log(`Distance(decimal): ${distance}km`);
	console.log(`Distance: ${shortDistance}km`);
	res.status(200).send({ distance: distance });
});

// Configuration for the server
http.createServer(app).listen(port, () => {
	console.log(`Server is running on port: ${port}`);
});
