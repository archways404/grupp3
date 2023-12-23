/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';

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
	const [renderTravel, setRenderTravel] = useState(false);
	const [priceToDrive, setPriceToDrive] = useState('');

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
		}

		return (itemsTotalCost + travelCost).toFixed(2);
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
			{renderTravel && (
				<div>
					<label>
						<input
							type="radio"
							value="gas"
							checked={travelOption === 'gas'}
							onChange={handleTravelOptionChange}
						/>
						Gas
					</label>
					<label>
						<input
							type="radio"
							value="ev"
							checked={travelOption === 'ev'}
							onChange={handleTravelOptionChange}
						/>
						EV
					</label>
				</div>
			)}

			<p>
				Total Cost: {calculateTotalCost()} {currencyCode}
			</p>
			<button
				className="p-2 text-white font-bold rounded bg-blue-500 mt-10"
				onClick={() =>
					onDisplayCartChange({ displayCart: false, showSummary: true })
				}>
				Submit
			</button>
		</div>
	);
}

export default Cart;
