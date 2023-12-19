const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const db_username = process.env.DB_USERNAME;
const db_password = process.env.DB_PASSWORD;

const uri = `mongodb+srv://${db_username}:${db_password}@cluster0.z2qrryy.mongodb.net/?retryWrites=true&w=majority`;

mongoose
	.connect(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log('Connected to MongoDB'))
	.catch((err) => console.error('Could not connect to MongoDB...', err));

const arraySchema = new mongoose.Schema({
	products: [
		{
			prod_id: String,
			title: String,
			img: String,
			price: Number,
		},
	],
});

const ProductArray = mongoose.model('ProductArray', arraySchema);

async function viewDatabaseContents() {
	try {
		const allData = await ProductArray.find();
		//console.log('Database Contents:', JSON.stringify(allData, null, 2));
		return JSON.stringify(allData, null, 2);
	} catch (err) {
		console.error('Error fetching data from the database:', err);
	}
}

function getProductById(products, product_id) {
	const uniqueProducts = products.filter((product) => {
		return product.prod_id === product_id;
	});
	return uniqueProducts;
}

function getProductByName(products, product_name) {
	const searchQuery = product_name.toLowerCase();
	const similarProducts = products.filter((product) => {
		return product.title.toLowerCase().includes(searchQuery);
	});
	return similarProducts;
}

async function convertProducts() {
	const allDataString = await viewDatabaseContents();
	const allData = JSON.parse(allDataString);

	let products = [];
	allData.forEach((item) => {
		if (item.products) {
			products = products.concat(item.products);
		}
	});

	return products;
}

async function getPrices(products) {
	const prices = products.map((product) => {
		return { price: product.price, prod_id: product.prod_id };
	});
	return prices;
}

function convertPrice(products, conversionRate) {
	const convertedProducts = products.map((product) => {
		return {
			prod_id: product.prod_id,
			title: product.title,
			img: product.img,
			price: parseFloat(product.price / conversionRate).toFixed(2),
		};
	});
	return convertedProducts;
}

/*
async function main() {
	const products = await convertProducts();
	// Now you can use 'products' to find specific products
	const product_ids = getProductById(products, '42442');
	console.log(product_ids);
	const product_name = getProductByName(products, 'tuborg classic');
	console.log(product_name);

	const allPrices = await getPrices(products);
	console.log(allPrices);

	const conversionRate = 6.81; // This is your external price factor
	const updatedProducts = convertPrice(products, conversionRate);
	console.log(updatedProducts);
}

main();
*/

module.exports = {
	viewDatabaseContents,
	getProductById,
	getProductByName,
	convertProducts,
	getPrices,
	convertPrice,
};
