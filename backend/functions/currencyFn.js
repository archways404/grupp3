const dotenv = require('dotenv');
dotenv.config();

async function getExchangeRates() {
	const url = `https://api.freecurrencyapi.com/v1/latest?apikey=${process.env.FREE_CURRENCY_KEY}`;
	try {
		const response = await fetch(url);
		const fullData = await response.json();
		console.log(fullData.data);
		return fullData.data;
	} catch (error) {
		console.error(error);
		return error;
	}
}

async function getConverstionRateToUSD() {
	const url = `https://api.freecurrencyapi.com/v1/latest?apikey=${process.env.FREE_CURRENCY_KEY}`;
	try {
		const response = await fetch(url);
		const fullData = await response.json();
		console.log(fullData.data.DKK);
		return fullData.data.DKK;
	} catch (error) {
		console.error(error);
		return error;
	}
}

async function convertValueToUSD(itemValue) {
	const exchangeRate = await getConverstionRateToUSD();
	const itemValueInUSD = itemValue / exchangeRate;
	console.log(itemValueInUSD);
	// two decimals - not more
	return itemValueInUSD;
}

async function convertValueFromUSD(exchangeRate, itemValue) {
	const LocalItemValue = itemValue * exchangeRate;
	console.log(LocalItemValue);
	// two decimals - not more
	return LocalItemValue;
}

module.exports = {
	getExchangeRates,
	getConverstionRateToUSD,
	convertValueToUSD,
	convertValueFromUSD,
};
