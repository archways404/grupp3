const dotenv = require('dotenv');
dotenv.config();

const token = '';
//const token = process.env.SALLING_BEARER_TOKEN;
console.log(token);

const product = 'øl';

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

// search for product by title
function findProductByTitle(transformedData, title) {
	return transformedData.find((item) => item.product.title === title);
}

// search for product by id
function findProductById(transformedData, prod_id) {
	return transformedData.find((item) => item.product.prod_id === prod_id);
}

(async () => {
	const products = await getProductCategory(product, token);
	console.log(products);
	console.time('transformedData');
	const transformedData = products.map((item) => {
		return {
			product: {
				title: item.title,
				//price: item.price,
				prod_id: item.prod_id,
			},
		};
	});
	console.log(transformedData);
	/*
	const productDataByTitle = findProductByTitle(
		transformedData,
		'SodaStream kulsyrepatron 60 liter'
	);
	const productDataById = findProductById(transformedData, '113245');
	console.log(productDataByTitle);
	console.log(productDataById);
  */

	console.timeEnd('transformedData');
})();
