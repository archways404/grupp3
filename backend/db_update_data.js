// Populate the database with data from Salling Group API

// ENVIRONMENT VARIABLES
const dotenv = require('dotenv');
dotenv.config();

const token = process.env.SALLING_BEARER_TOKEN;
const db_password = process.env.DB_PASSWORD;
const db_username = process.env.DB_USERNAME;
const uri = `mongodb+srv://${db_username}:${db_password}@cluster0.z2qrryy.mongodb.net/?retryWrites=true&w=majority`;

// Search term
const product = 'øl';

// Connect to MongoDB
const mongoose = require('mongoose');

mongoose
	.connect(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log('Connected to MongoDB'))
	.catch((err) => console.error('Could not connect to MongoDB...', err));

// Define the schema
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

// Insert the data into the database
async function insertProductArray(data) {
	try {
		const productArray = new ProductArray({ products: data });
		await productArray.save();
		console.log('Product array inserted successfully');
	} catch (err) {
		console.error('Error inserting product array:', err);
	}
}

async function getProductCategory(product, token) {
	const url = `https://api.sallinggroup.com/v1-beta/product-suggestions/relevant-products?query=${product}`;
	const options = {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${token}`,
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

async function searchForMoreProducts(prod_id, token) {
	const url = `https://api.sallinggroup.com/v1-beta/product-suggestions/similar-products?productId=${prod_id}`;
	const options = {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	try {
		const response = await fetch(url, options);
		const data = await response.json();
		return data;
	} catch (error) {
		console.error(error);
		return error;
	}
}

function extractProductDetails(allProductDetails) {
	// Flatten the array of arrays into a single array of products
	const flattenedProducts = allProductDetails.flat();

	// Map over each product to extract the desired properties
	const extractedDetails = flattenedProducts.map((product) => {
		return {
			prod_id: product.prod_id,
			title: product.title,
			img: product.img,
			price: product.price,
		};
	});

	return extractedDetails;
}

function removeDuplicates(products) {
	const seenProdIds = new Set();
	const uniqueProducts = products.filter((product) => {
		if (seenProdIds.has(product.prod_id)) {
			return false; // skip this product
		} else {
			seenProdIds.add(product.prod_id);
			return true; // keep this product
		}
	});
	return uniqueProducts;
}

async function main() {
	const products = await getProductCategory(product, token);
	const prodIds = products.map((item) => item.prod_id);
	console.time('Processing Time');
	const promises = prodIds.map((prod_id) =>
		searchForMoreProducts(prod_id, token)
	);
	try {
		const allProductDetails = await Promise.all(promises);
		const detailedProducts = extractProductDetails(allProductDetails);
		const filteredProducts = detailedProducts.filter((product) => {
			return (
				product.title &&
				typeof product.title === 'string' &&
				!product.title.includes('alkoholfri')
			);
		});
		const uniqueProducts = removeDuplicates(filteredProducts);
		console.log(uniqueProducts);
		console.log('filteredProducts.length: ', filteredProducts.length);
		console.log('After Dupe-Check: ', uniqueProducts.length);
		await insertProductArray(uniqueProducts);
	} catch (error) {
		console.error('Error in processing:', error);
	}
	console.timeEnd('Processing Time');
}

main();
