/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import ProgressBar from './ProgressBar';

function Cart(props) {
	const selectedProducts = JSON.parse(
		sessionStorage.getItem('selectedProducts')
	);

	const [allRates, setAllRates] = useState({});
	const [exchangeRate, setExchangeRate] = useState('');
	const [currencyCode, setCurrencyCode] = useState('');
	const [quantities, setQuantities] = useState({});
	const [itemCosts, setItemCosts] = useState({});
	// eslint-disable-next-line react/prop-types
	const { onDisplayCartChange } = props;
	const [currentDistance, setCurrentDistance] = useState('');
	const [travelOption, setTravelOption] = useState('');
	const [driveGas, setDriveGas] = useState('');
	const [driveEV, setDriveEV] = useState('');
	const [driveFlight, setDriveFlight] = useState('');
	const [renderTravel, setRenderTravel] = useState(false);
	const [priceToDrive, setPriceToDrive] = useState('');
	const [submitClicked, setSubmitClicked] = useState(false);

	const progress = 60;

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
			sessionStorage.setItem('order', JSON.stringify(quantities));
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
				sessionStorage.setItem(
					'closestStore',
					JSON.stringify(data.closestStore)
				);
				sessionStorage.setItem('distance', JSON.stringify(data.distance));
				console.log(data.distance);
				console.log(data.costs);
				console.log(data.costsElectric);
				setCurrentDistance(data.distance);
				setDriveGas(data.costs);
				setDriveEV(data.costsElectric);
				setRenderTravel(true);
				setSubmitClicked(true);
			} else {
				console.log('Error: ', response.status);
			}
		} catch (err) {
			console.log(err);
		}
	};

	const handleTravelOptionChange = (e) => {
		setTravelOption(e.target.value);
	};

	const calculateTotalCost = () => {
		const itemsTotalCost = Object.values(itemCosts).reduce(
			(acc, cost) => acc + parseFloat(cost),
			0
		);

		let travelCost = 0;
		if (travelOption === 'gas') {
			travelCost = parseFloat(driveGas);
			sessionStorage.setItem('travelCost', JSON.stringify(driveGas));
		} else if (travelOption === 'ev') {
			travelCost = parseFloat(driveEV);
			sessionStorage.setItem('travelCost', JSON.stringify(driveEV));
		} else if (travelOption === 'flight') {
			travelCost = parseFloat(driveFlight);
			sessionStorage.setItem('travelCost', JSON.stringify(100));
		}


		return (itemsTotalCost + travelCost).toFixed(2);
	};

	const calculateCost = () => {
		const itemsTotalCost = Object.values(itemCosts).reduce(
			(acc, cost) => acc + parseFloat(cost),
			0
		);
		let travelCost = 0;
		return (itemsTotalCost + travelCost).toFixed(2);
	};

	return (
		<div className="flex flex-col justify-start items-center pt-10 bg-gray-900 min-h-screen text-white">
			{/* Currency Dropdown */}
			<div className="currency-selector mb-6 bg-gray-800 p-4 rounded-lg">
				<label
					htmlFor="currency-select"
					className="text-green-500 mr-2">
					Choose Currency:
				</label>
				<select
					id="currency-select"
					onChange={handleCurrencyChange}
					value={currencyCode}
					className="p-2 rounded border border-green-500 bg-gray-700 text-white">
					{Object.keys(allRates).map((code) => (
						<option
							key={code}
							value={code}>
							{code}
						</option>
					))}
				</select>
			</div>

			{/* Product Cards */}
			<div className="product-cards-container w-full px-4">
				{selectedProducts.map((product, index) => (
					<div
						key={index}
						className="bg-gray-800 p-4 rounded-lg mb-4 shadow-lg">
						<div className="flex items-center justify-between">
							<div>
								<h3 className="text-xl font-semibold">{product.title}</h3>
								<p className="text-lg">
									{(product.price * exchangeRate).toFixed(2)} {currencyCode}
								</p>
							</div>
							<div>
								<label
									htmlFor={`quantity-select-${product.prod_id}`}
									className="mr-2">
									Amount:
								</label>
								<select
									id={`quantity-select-${product.prod_id}`}
									value={quantities[product.prod_id] || ''}
									onChange={(e) =>
										handleQuantityChange(product.prod_id, e.target.value)
									}
									className="p-2 rounded border border-gray-600 bg-gray-700 text-white">
									{Array.from({ length: 20 }, (_, i) => i + 0).map((amount) => (
										<option
											key={amount}
											value={amount}>
											{amount}
										</option>
									))}
								</select>
							</div>
							<div>
								<p>
									Cost: {itemCosts[product.prod_id] || '0.00'} {currencyCode}
								</p>
							</div>
							<div>
								<p>
									Calculated Price for the Item:
									{(
										product.price *
										exchangeRate *
										(quantities[product.prod_id] || 0)
									).toFixed(2)}{' '}
									{currencyCode}
								</p>
							</div>
						</div>
					</div>
				))}
			</div>

			{/* Submit Button */}
			{!submitClicked && (
				<button
					className="p-2 text-white font-bold rounded bg-green-600 hover:bg-green-700 mt-10 transition-colors"
					onClick={handleSubmit}>
					Submit
				</button>
			)}

			{/* Travel Options */}
			{renderTravel && (
				<div className="travel-options bg-gray-800 p-4 rounded-lg mt-6">
					<label className="mr-4">
						<input
							type="radio"
							value="gas"
							checked={travelOption === 'gas'}
							onChange={handleTravelOptionChange}
							className="mr-2"
						/>
						Gas
					</label>
					<label>
						<input
							type="radio"
							value="ev"
							checked={travelOption === 'ev'}
							onChange={handleTravelOptionChange}
							className="mr-2"
						/>
						EV
					</label>
					<label>
						<input
							type="radio"
							value="flight"
							checked={travelOption === 'flight'}
							onChange={handleTravelOptionChange}
							className="mr-2"
						/>
						Flight
					</label>
				</div>
			)}

			{/* Total Cost */}
			<p className="mt-6">
				Items in cart: {calculateCost()} {currencyCode}
			</p>

			{/* Total Cost */}
			<p className="mt-6">
				Total Cost: {calculateTotalCost()} {currencyCode}
			</p>

			{/* Display Cart Button */}
			{travelOption && (
				<button
					className="p-2 text-white font-bold rounded bg-green-600 hover:bg-green-700 mt-10 transition-colors"
					onClick={() =>
						onDisplayCartChange({ displayCart: false, showSummary: true })
					}>
					Go to Summary
				</button>
			)}
			<ProgressBar progress={progress} />
		</div>
	);

}

export default Cart;
