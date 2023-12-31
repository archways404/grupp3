/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import ProgressBar from './ProgressBar';

function Summary(props) {
	const { onDisplaySummaryChange } = props;
	const [allRates, setAllRates] = useState({});
	const [exchangeRate, setExchangeRate] = useState('');
	const [currencyCode, setCurrencyCode] = useState('');
	const [quantities, setQuantities] = useState({});
	const [itemCosts, setItemCosts] = useState({});
	const [travelCost, setTravelCost] = useState(0);
	const [totalCost, setTotalCost] = useState(0);
	const [selectedProducts, setSelectedProducts] = useState([]);
	const [orderAmount, setOrderAmount] = useState([]);
	const [cartCost, setCartCost] = useState(0);
	const [closestStore, setClosestStore] = useState('');

	const progress = 100;

	useEffect(() => {
		const productsData = sessionStorage.getItem('selectedProducts');
		const travelData = sessionStorage.getItem('travelCost');
		const orderData = sessionStorage.getItem('order');
		const closestStoreData = sessionStorage.getItem('closestStore');

		if (productsData) setSelectedProducts(JSON.parse(productsData));
		if (travelData) setTravelCost(JSON.parse(travelData));
		if (orderData) setOrderAmount(JSON.parse(orderData));
		if (closestStoreData) {
			setClosestStore(JSON.parse(closestStoreData)); // Parse the JSON string
		}
	}, []);

	useEffect(() => {
		// Calculate item costs whenever quantities or exchange rate changes
		let total = 0; // Initialize total cost
		const updatedItemCosts = {};
		selectedProducts.forEach((product) => {
			const amount = orderAmount[product.prod_id] || 0;
			const itemCost = (product.price * exchangeRate * amount).toFixed(2);
			updatedItemCosts[product.prod_id] = itemCost;
			total += parseFloat(itemCost); // Accumulate the total cost
		});
		setItemCosts(updatedItemCosts);
		setCartCost(total);
		setTotalCost(total + travelCost); // Add travel cost to total
	}, [selectedProducts, orderAmount, exchangeRate, travelCost]);

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

	// New function to get item amounts
	const getItemAmounts = () => {
		return selectedProducts.map((product) => {
			const amount = orderAmount[product.prod_id] || 'N/A';
			return {
				...product,
				amount,
			};
		});
	};

	useEffect(() => {
		const updatedItemCosts = {};
		selectedProducts.forEach((product) => {
			// Use the amount from orderAmount instead of quantities
			const amount = orderAmount[product.prod_id] || 0;
			const itemCost = (product.price * exchangeRate * amount).toFixed(2);
			updatedItemCosts[product.prod_id] = itemCost;
		});
		setItemCosts(updatedItemCosts);
	}, [selectedProducts, orderAmount, exchangeRate]);

	return (
		<div className="flex flex-col justify-start items-center pt-10 bg-gray-900 min-h-screen text-white">
			<h1 className="text-green-500 text-4xl font-bold mb-6">Summary Page</h1>

			{/* Currency Dropdown */}
			<div className="currency-selector mb-6 bg-gray-800 p-4 rounded-lg">
				<label
					htmlFor="currency-select"
					className="mr-2 text-green-500">
					Choose Currency:
				</label>
				<select
					id="currency-select"
					onChange={handleCurrencyChange}
					value={currencyCode}
					className="p-2 rounded bg-gray-700 text-white">
					{Object.keys(allRates).map((code) => (
						<option
							key={code}
							value={code}>
							{code}
						</option>
					))}
				</select>
			</div>

			{/* Products List */}
			<div className="item-amounts mt-4 w-full max-w-4xl">
				{selectedProducts.map((product) => {
					const amount = orderAmount[product.prod_id] || 'N/A';
					return (
						<div
							key={product.prod_id}
							className="bg-gray-800 p-4 rounded-lg mb-4 shadow-lg flex justify-between items-center">
							<span>{product.title}</span>
							<span>{`Unit Price: ${(product.price * exchangeRate).toFixed(
								2
							)} ${currencyCode}`}</span>
							<span>{`${amount} units`}</span>
							<span>{`Total: ${
								itemCosts[product.prod_id]
							} ${currencyCode}`}</span>
						</div>
					);
				})}
			</div>

			{/* Closest Store Details */}
			<div className="travel-cost mt-6 w-full max-w-4xl bg-gray-800 p-4 rounded-lg shadow-lg">
				<p>{`City: ${closestStore.city}`}</p>
				<p>{`Country: ${closestStore.country}`}</p>
				<p>{`Street: ${closestStore.street}`}</p>
				<p>{`ZIP Code: ${closestStore.zip}`}</p>
			</div>

			{/* Travel Cost Section */}
			<div className="travel-cost mt-6 w-full max-w-4xl bg-gray-800 p-4 rounded-lg shadow-lg">
				<p>{`Travel Cost: ${travelCost.toFixed(2)} ${currencyCode}`}</p>
			</div>

			{/* Cart Cost */}
			<div className="total-cost mt-4 w-full max-w-4xl bg-gray-800 p-4 rounded-lg shadow-lg">
				<p>{`Total Cost (Excluding Travel): ${cartCost.toFixed(
					2
				)} ${currencyCode}`}</p>
			</div>

			{/* Total Cost Section */}
			<div className="total-cost mt-4 w-full max-w-4xl bg-gray-800 p-4 rounded-lg shadow-lg">
				<p>{`Total Cost (Including Travel): ${totalCost.toFixed(
					2
				)} ${currencyCode}`}</p>
			</div>

			{/* Print Receipt Button */}
			<button
				onClick={() => window.print()}
				className="p-2 text-black rounded bg-green-600 hover:bg-green-700 mt-4 hover:font-bold transition-colors">
				Print Receipt
			</button>
			<ProgressBar progress={progress} />
		</div>
	);

}

export default Summary;
