function degreesToRadians(degrees) {
	return (degrees * Math.PI) / 180;
}

function distanceInKmBetweenEarthCoordinates(lat1, lon1, lat2, lon2) {
	var earthRadiusKm = 6371;

	var dLat = degreesToRadians(lat2 - lat1);
	var dLon = degreesToRadians(lon2 - lon1);

	lat1 = degreesToRadians(lat1);
	lat2 = degreesToRadians(lat2);

	var a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	return earthRadiusKm * c;
}

// Example usage
var distance = distanceInKmBetweenEarthCoordinates(
	50.06638889,
	-5.71472222,
	58.64388889,
	-3.07
);
console.log(distance);

async function getCoordinates(address) {
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

getCoordinates('Kometgatan 14').then((coords) => {
	console.log(coords);
});
