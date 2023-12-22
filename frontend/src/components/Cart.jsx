import React, { useState, useEffect } from 'react';

function Cart(props) {
	const selectedProducts = JSON.parse(
		sessionStorage.getItem('selectedProducts')
	);

	const [allRates, setAllRates] = useState({});
	const [exchangeRate, setExchangeRate] = useState('');
	const [currencyCode, setCurrencyCode] = useState('');
	const [quantities, setQuantities] = useState({});
	const [itemCosts, setItemCosts] = useState({}); // Added state for item costs
	const { onDisplayCartChange } = props; // Destructure the prop

	useEffect(() => {
		// Retrieve and parse the data from sessionStorage
		const searchResults = sessionStorage.getItem('searchResults');
		if (searchResults) {
			const data = JSON.parse(searchResults);
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

	useEffect(() => {
		// Calculate item costs whenever quantities or exchange rate changes
		const updatedItemCosts = {};
		selectedProducts.forEach((product) => {
			const quantity = quantities[product.prod_id] || 0;
			const itemCost = (product.price * exchangeRate * quantity).toFixed(2);
			updatedItemCosts[product.prod_id] = itemCost;
		});
		setItemCosts(updatedItemCosts);
	}, [quantities, exchangeRate]);

	const handleCurrencyChange = (event) => {
		const selectedCurrencyCode = event.target.value;
		const selectedRate = allRates[selectedCurrencyCode];
		setExchangeRate(selectedRate || 1);
		setCurrencyCode(selectedCurrencyCode);
	};

	const handleQuantityChange = (productId, quantity) => {
		setQuantities((prevQuantities) => ({
			...prevQuantities,
			[productId]: quantity,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			// Send the order to the backend using quantities object
			console.log('Order submitted:', quantities);
			const location_longitude = sessionStorage.getItem('longitude');
			const location_latitude = sessionStorage.getItem('latitude');

			const response = await fetch('http://localhost:9999/api/StoreLocation/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					location_longitude: location_longitude,
					location_latitude: location_latitude,
				}),
			});

			if (response.status === 200) {
				const data = await response.json();
				console.log(data.closestStore);
				console.log(data.distance);

				if (data.distance > 150) {
					onDisplayCartChange({ displayFlight: true, displayTravel: true });
				} else {
					onDisplayCartChange({ displayFlight: false, displayTravel: true });
				}
			} else {
				console.log('Error: ', response.status);
			}
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className="flex flex-col justify-start items-center pt-10 bg-slate-700 min-h-screen">
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
					className="p-2 rounded border border-gray-300 bg-white text-black">
					{Object.keys(allRates).map((code) => (
						<option
							key={code}
							value={code}>
							{code}
						</option>
					))}
				</select>
			</div>
			<div className="product-cards-container w-full px-4">
				{selectedProducts.map((product, index) => (
					<div
						key={index}
						className="flex items-center mb-4">
						<div className="mr-4">
							<h3>{product.title}</h3>
							<p className="card-price text-xl font-bold">
								{(product.price * exchangeRate).toFixed(2)} {currencyCode}
							</p>
						</div>
						<div className="mr-4">
							<label htmlFor={`quantity-select-${product.prod_id}`}>
								Amount:
							</label>
							<select
								id={`quantity-select-${product.prod_id}`}
								value={quantities[product.prod_id] || ''}
								onChange={(e) =>
									handleQuantityChange(product.prod_id, e.target.value)
								}
								className="p-2 rounded border border-gray-300 bg-white text-black">
								{Array.from({ length: 20 }, (_, i) => i + 0).map((amount) => (
									<option
										key={amount}
										value={amount}>
										{amount}
									</option>
								))}
							</select>
						</div>
						<div className="mr-4">
							<p>
								Cost: {itemCosts[product.prod_id] || '0.00'} {currencyCode}
							</p>
						</div>
						<div className="mr-4">x</div>
						<div>
							<p>
								Calculated Price for the Item:{' '}
								{(
									product.price *
									exchangeRate *
									(quantities[product.prod_id] || 0)
								).toFixed(2)}{' '}
								{currencyCode}
							</p>
						</div>
					</div>
				))}
			</div>
			<button
				className="p-2 text-white font-bold rounded bg-blue-500 mt-10"
				onClick={handleSubmit}>
				Submit
			</button>
			<p>
				Total Cost:{' '}
				{Object.values(itemCosts)
					.reduce((acc, cost) => acc + parseFloat(cost), 0)
					.toFixed(2)}
			</p>{' '}
			{currencyCode}
		</div>
	);
};

export default Cart;