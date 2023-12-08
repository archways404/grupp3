const dotenv = require('dotenv');
dotenv.config();

const token = '5afa1009-3c70-425a-a975-7202189d9824';
//const token = process.env.SALLING_BEARER_TOKEN;
console.log(token);

const product = 'soda';

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

(async () => {
	const products = await getProductCategory(product, token);
	const product_list = [];
	for (i in products) {
		console.log(products[i].title);
		console.log(products[i].price);
		console.log(products[i].prod_id);
		console.log('------------------');
		product_list.push({
			title: products[i].title,
			price: products[i].price,
			prod_id: products[i].prod_id,
		});
	}
	console.log(product_list);
	console.log(product_list.length);
})();
