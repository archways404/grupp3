async function getAirPorts(CC, kword) {
	const bearerToken = ''; // Replace with your actual token
	const url = `https://test.api.amadeus.com/v1/reference-data/locations/cities?countryCode=${CC}&keyword=${kword}&include=AIRPORTS`;

	try {
		const response = await fetch(url, {
			method: 'GET', // The HTTP method, this can be 'GET', 'POST', etc.
			headers: {
				Authorization: `Bearer ${bearerToken}`, // Include the bearer token in the Authorization header
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

async function getFlights(origin, destination, date, returnDate) {
	const bearerToken = ''; // Replace with your actual token
	const url = `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${origin}&destinationLocationCode=${destination}&departureDate=${date}returnDate=${returnDate}&adults=1`;

	try {
		const response = await fetch(url, {
			method: 'GET', // The HTTP method, this can be 'GET', 'POST', etc.
			headers: {
				Authorization: `Bearer ${bearerToken}`, // Include the bearer token in the Authorization header
			},
		});
		const data = await response.json();
		return { data: data };
	} catch (error) {
		console.error(error);
		return null;
	}
}

async function main() {
	const test1 = await getAirPorts('DK', 'AALBORG');
	console.log('test1: ', test1);
	const test2 = await getFlights('MAD', 'AAL', '2024-02-15', '2024-02-16');
	console.log('test2: ', test2);
}

main();

/*

GET AIRPORT:

https://test.api.amadeus.com/v1/reference-data/locations/cities?countryCode=DK&keyword=AALBORG&include=AIRPORTS


GET FLIGHTS:

https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=MAD&destinationLocationCode=AAL&departureDate=2024-02-11&returnDate=2024-02-12&adults=1

*/
