import React, { useState, useEffect } from 'react';

function Flight(props) {
	const selectedProducts = JSON.parse(
		sessionStorage.getItem('selectedProducts')
	);

	const [allRates, setAllRates] = useState({});
	const [exchangeRate, setExchangeRate] = useState('');
	const [currencyCode, setCurrencyCode] = useState('');
	const [quantities, setQuantities] = useState({});
	const [itemCosts, setItemCosts] = useState({}); // Added state for item costs
	const { onDisplayFlightChange } = props; // Destructure the prop

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
		</div>
	);
}

export default Flight;
