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

async function getCoordinates(address) {
	const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
		address
	)}`;
	try {
		const response = await fetch(url);
		const data = await response.json();
		if (data.length > 0) {
			const returnObject = {
				latitude: data[0].lat,
				longitude: data[0].lon,
			};
			return returnObject;
			//return { latitude: data[0].lat, longitude: data[0].lon };
		} else {
			return null;
		}
	} catch (error) {
		console.error(error);
		return null;
	}
}

async function testDistance() {
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

async function getProduct(product) {
	const url = `https://api.sallinggroup.com/v1-beta/product-suggestions/relevant-products?query=${product}`;
	const options = {
		method: 'GET',
		headers: {
			Authorization: `Bearer 5afa1009-3c70-425a-a975-7202189d9824`,
			//Authorization: `Bearer ${token}`,
		},
	};
	try {
		const response = await fetch(url, options);
		const data = await response.json();
		if (data.suggestions.length > 0) {
			return data.suggestions;
		} else {
			return 'error; line 75';
		}
	} catch (error) {
		console.error(error);
		return error;
	}
}

async function filterProducts(products) {
	const product_list = [];
	for (product in products) {
		product_list.push(products[product].title);
	}
	return product_list;
}

async function getStores() {
	const url = `https://api.sallinggroup.com/v2/stores`;
	const options = {
		method: 'GET',
		headers: {
			Authorization: `Bearer 5afa1009-3c70-425a-a975-7202189d9824`,
		},
	};
	try {
		const response = await fetch(url, options);
		const data = await response.json();
		if (data.length > 0) {
			return data;
		} else {
			return 'error; line 105';
		}
	} catch (error) {
		console.error(error);
		return error;
	}
}

async function parseStores(stores) {
	let extendedData = stores.map((store) => {
		return {
			city: store.address ? store.address.city : null,
			street: store.address ? store.address.street : null,
			zip: store.address ? store.address.zip : null,
			coordinates: store.coordinates ? store.coordinates : null,
		};
	});
	let shortData = stores.map((store) => {
		return {
			city: store.address ? store.address.city : null,
		};
	});
	returnObject = {
		extended_data: extendedData,
		short_data: shortData,
	};
	return returnObject;
}

async function getExchangeRates() {
	const url = `https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_idqSqybb0N7gcBe4CoUKxCvvOKmC45JIfbPyQAR8`;
	try {
    const response = await fetch(url);
    const fullData = await response.json();
		return fullData.data;
	} catch (error) {
		console.error(error);
		return error;
	}
}

// Example usage
async function main() {
  const data = await getExchangeRates();
  //console.log(data);
  console.log(`1 USD = ${data.SEK} SEK`);
  const DKKtoSEK = data.SEK / data.DKK;
  const DKKinSEK = data.SEK * DKKtoSEK;
  console.log(`10 DKK = ${DKKinSEK} SEK`);
	await testDistance();
	const productSearchResults = await getProduct('corona');
	const products = await filterProducts(productSearchResults);
  console.log('products: ', products);
  const stores = await getStores();
	const parsedStores = await parseStores(stores);
  console.log('parsedStores (short_data): ', parsedStores.short_data);
  //console.log('parsedStores (extended_data): ', parsedStores.extended_data);
}

main();


// verification
// https://gps-coordinates.org/distance-between-coordinates.php

// stores
// https://api.sallinggroup.com/v2/stores
