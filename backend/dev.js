// Imports of the required packages
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();
const http = require('http');

// Import functions from the functions folder
const calcFn = require('./functions/calcFn.js');
const locationFn = require('./functions/locationFn.js');
const searchFn = require('./functions/searchFn.js');
const currencyFn = require('./functions/currencyFn.js');
const flightFn = require('./functions/flightFn.js');

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

// Routes for WEB-APP //
// Getting location from address
app.post('/api/sendLocation', async (req, res) => {
	// location is input parameter from frontend (ex "malmö")
	const location = req.body.location;
	const cordinates = await locationFn.getCordinates(location);
	console.log('Message:', cordinates);
	res.status(200).send({ cordinates: cordinates });
});
// Search for specific product or returns all products
app.post('/api/Search', async (req, res) => {
	// cord_long, cord_lat, searchValue are input parameters from frontend (searchValue is the search term)
	const searchValue = req.body.searchValue;
	const cord_long = req.body.cord_long;
	const cord_lat = req.body.cord_lat;
	try {
		// Get country name from coordinates
		const response_country = await fetch(
			`https://geocode.maps.co/reverse?lat=${cord_lat}&lon=${cord_long}&api_key=${process.env.GEOCODE_KEY}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);
		const data = await response_country.json();
		const countryName = data.address.country;
		// Get currency code from country
		const response_cc = await fetch(
			`https://restcountries.com/v3.1/name/${countryName}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);
		const cc = await response_cc.json();
		// Parsing of data
		const currencies = cc[0].currencies;
		const currencyCode = Object.keys(currencies)[0];
		// Get exchange rates
		const exchangerates = await currencyFn.getExchangeRates();
		// Get local exchange rate (the default)
		const exchangeRateSpecifics = exchangerates[currencyCode];
		// Get the converstion rate from DKK to USD (default price is in DKK)
		const exchangeRate = await currencyFn.getConverstionRateToUSD();
		// If the user searched for a non-specific product -> display all products
		if (searchValue === '') {
			const products = await searchFn.convertProducts();
			// Convert the data to USD from (default) DKK
			const updatedProducts = searchFn.convertPrice(products, exchangeRate);
			res.status(200).send({
				updatedProducts: updatedProducts,
				exchangeRate: exchangeRateSpecifics,
				currencyCode: currencyCode,
				allRates: exchangerates,
			});
		} else {
			// If the user searched for a specific product -> display only that product
			const products = await searchFn.convertProducts();
			// Search for the products
			const product_name = searchFn.getProductByName(products, searchValue);
			// Convert the data to USD from (default) DKK
			const updatedProducts = await searchFn.convertPrice(
				product_name,
				exchangeRate
			);
			res.status(200).send({
				updatedProducts: updatedProducts,
				exchangeRate: exchangeRateSpecifics,
				currencyCode: currencyCode,
				allRates: exchangerates,
			});
		}
	} catch (error) {
		console.error(error);
		return error;
	}
});

//! WORK IN PROGRESS
app.post('/api/getCodes', async (req, res) => {
	const cord_long = req.body.cord_long;
	const cord_lat = req.body.cord_lat;

	// GET THE STORE LOCATION FROM THE COORDINATES HERE AS WELL

	try {
		// Get country name from coordinates
		const response_location = await fetch(
			`https://geocode.maps.co/reverse?lat=${cord_lat}&lon=${cord_long}&api_key=${process.env.GEOCODE_KEY}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);
		const locationData = await response_location.json();
		const location_countryName = locationData.address.country;
		const location_country_code = locationData.address.country_code;
		const location_city = locationData.address.city;

		// NOW CALL THE FUNCTION AGAIN BUT WITH THE DATA FOR THE STORE LOCATION

		// Get country name from coordinates
		const response_store = await fetch(
			`https://geocode.maps.co/reverse?lat=${cord_lat}&lon=${cord_long}&api_key=${process.env.GEOCODE_KEY}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);
		const storeLocationData = await response_store.json();
		const store_countryName = storeLocationData.address.country;
		const store_country_code = storeLocationData.address.country_code;
		const store_city = storeLocationData.address.city;

		res.status(200).send({
			location: {
				countryName: location_countryName,
				countryCode: location_country_code,
				city: location_city,
			},
			storeLocation: {
				countryName: store_countryName,
				countryCode: store_country_code,
				city: store_city,
			},
		});
	} catch (error) {
		console.error(error);
		return error;
	}
});

app.post('/api/getAirports', async (req, res) => {
	// ORIGIN COUNTRY CODE & CITY
	const origin_cc = req.body.origin_cc;
	const origin_city = req.body.origin_city;
	// DESTINATION COUNTRY CODE & CITY
	const destination_cc = req.body.destination_cc;
	const destination_city = req.body.destination_city;

	try {
		// ORIGIN_RESP CONTAINS CONTAINS ORIGIN AIRPORT INFORMATION (NEEDS FORMATTING)
		const origin_resp = await flightFn.getAirports(origin_cc, origin_city);

		// DESTINATION_RESP CONTAINS DESTINATION AIRPORT INFORMATION (NEEDS FORMATTING)
		const destination_resp = await flightFn.getAirports(
			destination_cc,
			destination_city
		);

		// RETURN THE FORMATTED DATA
		res.status(200).send({
			origin: origin_resp,
			destination: destination_resp,
		});
	} catch (error) {
		console.error(error);
		return error;
	}
});

app.post('/api/getFlights', async (req, res) => {
	// GETTING DATES
	const dates = await flightFn.getDates();

	// INPUT PARAMS

	const origin = req.body.origin;
	const destination = req.body.destination;

	// PARSING OUT DATE & RETURN DATE
	const date = dates.date;
	const returnDate = dates.returnDate;

	try {
		// API CALL
		const response = await flightFn.getFlights(
			origin,
			destination,
			date,
			returnDate
		);

		// MODIFY RESPONSE HERE TO GET THE DATA WE WANT
		console.log(response.data.price.total);

		res.status(200).send(response.data);
	} catch (error) {
		console.error(error);
		return error;
	}
});
//! WORK IN PROGRESS

// Determining the closest store
app.post('/api/StoreLocation', async (req, res) => {
	// location_longitude, location_latitude are input parameters from frontend
	const user_location_longitude = req.body.location_longitude;
	const user_location_latitude = req.body.location_latitude;
	try {
		const url = `https://api.sallinggroup.com/v2/stores`;
		const options = {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${process.env.SALLING_BEARER_TOKEN}`,
			},
		};
		// Fetching stores from Salling Group API
		const response = await fetch(url, options);
		const stores = await response.json();
		let closestStore = null;
		let minDistance = Infinity;
		// Calculating the closest store
		stores.forEach((store) => {
			const [storeLongitude, storeLatitude] = store.coordinates;
			const distance = calcFn.calcDistance(
				user_location_latitude,
				user_location_longitude,
				storeLatitude,
				storeLongitude
			);

			if (distance < minDistance) {
				minDistance = distance;
				closestStore = store;
			}
		});

		// Calculating driving costs based on distance, fuel consumption and fuel price
		const costs = calcFn.calculateDrivingCost(minDistance, 4.13, 1.8);
		console.log('GAS Costs:', costs);
		const costsElectric = (minDistance / 15.38461538461538) * 1.05;
		console.log('costsElectric:', costsElectric);
		console.log(
			`The closest store is ${closestStore.brand} located at ${closestStore.address.street}, ${closestStore.address.city}. Distance: ${minDistance} km`
		);
		res.status(200).send({
			closestStore: closestStore.address,
			distance: Math.floor(minDistance),
			costs: parseFloat(costs.toFixed(2)),
			costsElectric: parseFloat(costsElectric.toFixed(2)),
		});
	} catch (error) {
		console.error(error);
		res.status(500).send('An error occurred');
	}
});

app.post('/api/flightSearch', async (req, res) => {
	const cc = req.body.cc;
	const kword = req.body.kword;
	const resp = await flightFn.getFlightData(cc, kword);

	res.status(200).send(resp);
});

// Routes for API //
// Returns Coordinates for the area given
app.post('/api/getLocation', async (req, res) => {
	const location = req.body.location;
	const cordinates = await locationFn.getCordinates(location);
	console.log('Message:', cordinates);
	res.status(200).send({ Location: location, Cordinates: cordinates });
});
// Returns searchable items and converts prices into local currency depending on area given
app.post('/api/apiSearchTest', async (req, res) => {
	const searchValue = req.body.searchValue;
	const countryName = req.body.countryName;
	try {
		const response_cc = await fetch(
			`https://restcountries.com/v3.1/name/${countryName}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);
		const cc = await response_cc.json();
		const currencies = cc[0].currencies;
		const currencyCode = Object.keys(currencies)[0];
		const exchangerates = await currencyFn.getExchangeRates();
		const exchangeRateSpecifics = exchangerates[currencyCode];
		const exchangeRate = await currencyFn.getConverstionRateToUSD();
		console.log('exchangeRate:', exchangeRate);
		if (searchValue === '') {
			const products = await searchFn.convertProducts();
			const updatedProducts = await searchFn.convertPrice(
				products,
				exchangeRate
			);
			console.log('updatedProducts:', updatedProducts);
			// Convert prices and prepare the final product array
			const fixedProducts = updatedProducts.map((product) => ({
				prod_id: product.prod_id,
				title: product.title,
				price:
					(product.price * exchangeRateSpecifics).toFixed(2) +
					' ' +
					currencyCode,
			}));
			res.status(200).send({
				products: fixedProducts,
			});
		} else {
			const products = await searchFn.convertProducts();
			const product_name = searchFn.getProductByName(products, searchValue);
			const updatedProducts = await searchFn.convertPrice(
				product_name,
				exchangeRate
			);
			const fixedProducts = updatedProducts.map((product) => ({
				prod_id: product.prod_id,
				title: product.title,
				price:
					(product.price * exchangeRateSpecifics).toFixed(2) +
					' ' +
					currencyCode,
			}));
			res.status(200).send({
				products: fixedProducts,
			});
		}
	} catch (error) {
		console.error(error);
		return error;
	}
});
// Returns the closest store to the user based on their location
app.post('/api/getStoreLocation', async (req, res) => {
	const location = req.body.location;
	const cordinates = await locationFn.getCordinates(location);
	console.log('🚀 ~ file: dev.js:243 ~ app.post ~ cordinates:', cordinates);

	const user_location_longitude = cordinates.longitude;
	const user_location_latitude = cordinates.latitude;
	console.log(
		'🚀 ~ file: dev.js:142 ~ app.post ~ user_location_longitude:',
		user_location_longitude
	);

	console.log(
		'🚀 ~ file: dev.js:144 ~ app.post ~ user_location_latitude:',
		user_location_latitude
	);

	const url = `https://api.sallinggroup.com/v2/stores`;
	const options = {
		method: 'GET',
		headers: {
			Authorization: `Bearer 5afa1009-3c70-425a-a975-7202189d9824`,
		},
	};
	try {
		const response = await fetch(url, options);
		const stores = await response.json();

		let closestStore = null;
		let minDistance = Infinity;

		stores.forEach((store) => {
			const [storeLongitude, storeLatitude] = store.coordinates;
			const distance = calcFn.calcDistance(
				user_location_latitude,
				user_location_longitude,
				storeLatitude,
				storeLongitude
			);

			if (distance < minDistance) {
				minDistance = distance;
				closestStore = store;
			}
		});
		console.log(
			`The closest store is ${closestStore.brand} located at ${closestStore.address.street}, ${closestStore.address.city}. Distance: ${minDistance} km`
		);
		res.status(200).send({
			closestStore: closestStore.address,
			distance: Math.floor(minDistance) + ' km',
		});
	} catch (error) {
		console.error(error);
		res.status(500).send('An error occurred');
	}
});

// Configuration for the server
http.createServer(app).listen(port, () => {
	console.log(`Server is running on port: ${port}`);
});
