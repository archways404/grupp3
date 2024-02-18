const dotenv = require('dotenv');
dotenv.config();

// GENERATE THE TRAVEL DATES
async function getDates() {
	// Get the current date
	let currentDate = new Date();

	// Format the date as "YYYYMMDD"
	let date =
		currentDate.getFullYear().toString() +
		('0' + (currentDate.getMonth() + 1)).slice(-2) +
		('0' + currentDate.getDate()).slice(-2);

	// Add 2 days to the current date
	currentDate.setDate(currentDate.getDate() + 2);

	// Format the new date
	let returnDate =
		currentDate.getFullYear().toString() +
		('0' + (currentDate.getMonth() + 1)).slice(-2) +
		('0' + currentDate.getDate()).slice(-2);

	return { date: date, returnDate: returnDate };
}

// GET THE AIRPORTS
async function getAirports(CC, kword) {
	const bearerToken = await getBearerToken(); // Replace with your actual token
	const url = `https://test.api.amadeus.com/v1/reference-data/locations/cities?countryCode=${CC}&keyword=${kword}&include=AIRPORTS`;

	try {
		const response = await fetch(url, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${bearerToken}`,
			},
		});
		const data = await response.json();
		console.log(data);
		return { data: data };
	} catch (error) {
		console.error(error);
		return null;
	}
}

// GET THE FLIGHTS
async function getFlights(origin, destination, date, returnDate) {
	const bearerToken = await getBearerToken(); // Replace with your actual token
	const url = `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${origin}&destinationLocationCode=${destination}&departureDate=${date}returnDate=${returnDate}&adults=1&max=1`;

	try {
		const response = await fetch(url, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${bearerToken}`,
			},
		});
		const data = await response.json();
		return { data: data };
	} catch (error) {
		console.error(error);
		return null;
	}
}

async function getBearerToken() {
	const url = 'https://test.api.amadeus.com/v1/security/oauth2/token';
	const client_id = process.env.AMADEUS_CLIENT_ID;
	const client_secret = process.env.AMADEUS_CLIENT_SECRET;
	const grant_type = 'client_credentials';

	try {
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: `client_id=${client_id}&client_secret=${client_secret}&grant_type=${grant_type}`,
		});
		const data = await response.json();
		return data.access_token;
	} catch (error) {
		console.error(error);
		return null;
	}
}

// GET THE FLIGHT DATA (AIRPORTS, ETC.)
async function getFlightData() {

	const getCodes = await fetch('/api/getCodes')
	const cc = getCodes.response.location.countryCode;
	const kword = getCodes.response.location.city;
	const resp = await getAirports(cc, kword);
	// Assuming resp.data contains the response structure you provided
	const airportData = resp.data.included.airports;
	console.log(airportData);

	// Create an array of airports from the airportData object
	const airports = Object.keys(airportData).map((key) => {
		const airport = airportData[key];
		const AP_data = {
			iataCode: airport.iataCode,
			name: airport.name,
			countryCode: airport.address.countryCode,
			latitude: airport.geoCode.latitude,
			longitude: airport.geoCode.longitude,
		};
		return AP_data;
	});
	return airports;
}



module.exports = {
	getAirports,
	getFlights,
	getFlightData,
	getDates,
};
