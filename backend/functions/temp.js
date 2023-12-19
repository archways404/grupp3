alldata = [
	{
		_id: '6573479f2986274ac9403bbe',
		products: [
			{
				prod_id: '39602',
				title: 'tuborg classic',
				img: 'https://image.prod.iposeninfra.com/bilkaimg.php?pid=39602&imgType=jpeg',
				price: 135,
				_id: '6573479f2986274ac9403bbf',
			},
			{
				prod_id: '42442',
				title: 'tuborg classic',
				img: 'https://image.prod.iposeninfra.com/bilkaimg.php?pid=42442&imgType=jpeg',
				price: 41.7,
				_id: '6573479f2986274ac9403bc0',
			},
		],
	},
];

function getProductById(products, product_id) {
	const seenProdIds = new Set();
	const uniqueProducts = products.filter((product) => {
		if (product.prod_id === product_id) {
			seenProdIds.add(product.prod_id);
			return true;
		} else {
			return false; // keep this product
		}
	});
	return uniqueProducts;
}

function getProductByName(products, product_name) {
	const seenProdNames = new Set();
	const uniqueProducts = products.filter((product) => {
		if (product.title === product_name) {
			seenProdNames.add(product.product_name);
			return true;
		} else {
			return false; // keep this product
		}
	});
	return uniqueProducts;
}

async function main() {
	const product_ids = getProductById(alldata[0].products, '42442');
	console.log(product_ids);
	const product_name = getProductByName(alldata[0].products, 'tuborg classic');
	console.log(product_name);
}
main();
