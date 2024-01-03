/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import ProgressBar from './ProgressBar';

function Products(props) {
	// Values
	const [products, setProducts] = useState([]);
	const [allRates, setAllRates] = useState({}); // Changed to an object
	const [exchangeRate, setExchangeRate] = useState('');
	const [currencyCode, setCurrencyCode] = useState('');
	const [selectedProducts, setSelectedProducts] = useState([]);
	const { onDisplayProductsChange } = props; // Destructure the prop

	const progress = 30;

	useEffect(() => {
		// Retrieve and parse the data from sessionStorage
		const searchResults = sessionStorage.getItem('searchResults');
		if (searchResults) {
			const data = JSON.parse(searchResults);
			setProducts(data.updatedProducts);
			setAllRates(data.allRates);
		}

		const localExchangeRate = sessionStorage.getItem('localExchangeRate');
		if (localExchangeRate) {
			const data = JSON.parse(localExchangeRate);
			setExchangeRate(data);
		}

		const localCurrencyCode = sessionStorage.getItem('localCurrencyCode');
		if (localCurrencyCode) {
			const data = JSON.parse(localCurrencyCode);
			setCurrencyCode(data);
		}
	}, []);

	const handleCurrencyChange = (event) => {
		const selectedCurrencyCode = event.target.value;
		const selectedRate = allRates[selectedCurrencyCode];
		setExchangeRate(selectedRate || 1); // Fallback to 1 if the rate is not found
		setCurrencyCode(selectedCurrencyCode);
	};

	const handleAddProduct = (product) => {
		setSelectedProducts((prevSelectedProducts) => [
			...prevSelectedProducts,
			product,
		]);
	};

	const handleRemoveProduct = (prodId) => {
		setSelectedProducts((prevSelectedProducts) =>
			prevSelectedProducts.filter((product) => product.prod_id !== prodId)
		);
	};

	const handleDisplayCart = async () => {
		try {
			sessionStorage.setItem(
				'selectedProducts',
				JSON.stringify(selectedProducts)
			);
			console.log('selectedProducts: ', selectedProducts);
			onDisplayProductsChange({ display: false });
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<>
			<div className="flex flex-col justify-start items-center pt-10 bg-gray-950 min-h-screen">
				{/* Currency Dropdown */}
				<div className="currency-selector mb-6">
					<label
						htmlFor="currency-select"
						className="text-white mr-2">
						Choose Currency:
					</label>
					<select
						id="currency-select"
						onChange={handleCurrencyChange}
						value={currencyCode}
						className="p-2 rounded border border-white bg-gray-950 text-white">
						{Object.keys(allRates).map((code) => (
							<option
								key={code}
								value={code}>
								{code}
							</option>
						))}
					</select>
				</div>

				{/* Cart Button */}
				<button
					className="p-2 text-black font-bold rounded bg-blue-500 absolute top-0 right-0 m-4"
					onClick={handleDisplayCart}>
					Cart ({selectedProducts.length})
				</button>

				{/* Product Cards Container */}
				<div className="product-cards-container w-full px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
					{products.map((product) => (
						<div
							key={product.prod_id}
							className="card bg-white rounded-lg shadow-lg overflow-hidden"
							style={{ maxWidth: 'calc(100% * 1 / 2)' }}>
							{' '}
							{/* Reduced card width */}
							<div className="h-24 w-full flex items-center justify-center">
								{' '}
								{/* Adjusted image container height */}
								<img
									src={product.img}
									alt={product.title}
									className="max-h-full max-w-full object-contain"
								/>
							</div>
							<div className="card-body p-5 flex flex-col justify-between">
								{' '}
								{/* Adjusted padding */}
								<h5 className="card-title text-lg font-semibold truncate">
									{product.title}
								</h5>
								<p className="card-price text-lg font-bold">
									{(product.price * exchangeRate).toFixed(2)} {currencyCode}
								</p>
								<button
									className={`p-1 text-white font-bold rounded text-sm ${
										selectedProducts.some((p) => p.prod_id === product.prod_id)
											? 'bg-red-500 hover:bg-red-600'
											: 'bg-green-500 hover:bg-green-600'
									}`}
									onClick={() => {
										selectedProducts.some((p) => p.prod_id === product.prod_id)
											? handleRemoveProduct(product.prod_id)
											: handleAddProduct(product);
									}}>
									{selectedProducts.some((p) => p.prod_id === product.prod_id)
										? 'Remove'
										: 'Add to Cart'}
								</button>
							</div>
						</div>
					))}
				</div>
			</div>
			<ProgressBar progress={progress} />
		</>
	);
}
export default Products;
