/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';

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

	useEffect(() => {
		const productsData = sessionStorage.getItem('selectedProducts');
		const travelData = sessionStorage.getItem('travelCost');
		const orderData = sessionStorage.getItem('order');

		if (productsData) setSelectedProducts(JSON.parse(productsData));
		if (travelData) setTravelCost(JSON.parse(travelData));
		if (orderData) setOrderAmount(JSON.parse(orderData));
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
		<div className="flex flex-col justify-start items-center pt-10 bg-slate-700 min-h-screen">
			<p>Summary Page</p>
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
			<div className="item-amounts mt-4">
				{selectedProducts.map((product) => {
					const amount = orderAmount[product.prod_id] || 'N/A';
					return (
						<div
							key={product.prod_id}
							className="text-white mb-2">
							{`${product.title} ${(product.price * exchangeRate).toFixed(
								2
							)} ${currencyCode} -> ${amount} units -> Total: ${
								itemCosts[product.prod_id]
							} ${currencyCode}`}
						</div>
					);
				})}
			</div>
			{/* Display travel cost */}
			<div className="travel-cost text-white mt-4">
				{`Travel Cost: ${travelCost.toFixed(2)} ${currencyCode}`}
			</div>
			{/* Display total cost */}
			<div className="total-cost text-white mt-4">
				{`Total Cost (Including Travel): ${totalCost.toFixed(
					2
				)} ${currencyCode}`}
			</div>
		</div>
	);
}

export default Summary;
