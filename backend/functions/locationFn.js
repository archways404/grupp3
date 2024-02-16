async function getCordinates(address) {
	const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
		address
	)}`;
	try {
		const response = await fetch(url);
		const data = await response.json();
		if (data.length > 0) {
			return { latitude: data[0].lat, longitude: data[0].lon };
		} else {
			return null;
		}
	} catch (error) {
		console.error(error);
		return null;
	}
}

async function getDistance() {
	const store_coordinates = [9.876099, 57.004687];
	const cordinates = await getCoordinates('Norra Neptunigatan 1, Malmö');
	console.log(cordinates);
	const distance = distanceInKmBetweenEarthCoordinates(
		store_coordinates[1],
		store_coordinates[0],
		cordinates.latitude,
		cordinates.longitude
	);
	console.log(distance, 'km');
}

module.exports = {
	getCordinates,
	getDistance,
};
