/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Products(props) {
	// Values
	const [products, setProducts] = useState([]);
	const [allRates, setAllRates] = useState({}); // Changed to an object
	const [exchangeRate, setExchangeRate] = useState('');
	const [currencyCode, setCurrencyCode] = useState('');
	const { onDisplayProductsChange } = props; // Destructure the prop

	useEffect(() => {
		// Retrieve and parse the data from sessionStorage
		const searchResults = sessionStorage.getItem('searchResults');
		if (searchResults) {
			const data = JSON.parse(searchResults);
			setProducts(data.updatedProducts);
		}

		const allRates = sessionStorage.getItem('allRates');
		if (allRates) {
			const data = JSON.parse(allRates);
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

	const contextClass = {
		success: 'bg-green-700',
		error: 'bg-red-700',
		info: 'bg-gray-700',
		warning: 'bg-orange-500',
		default: 'bg-indigo-700',
		dark: 'bg-white-600 font-gray-300',
	};

	const handleCurrencyChange = (event) => {
		const selectedCurrencyCode = event.target.value;
		const selectedRate = allRates[selectedCurrencyCode];
		setExchangeRate(selectedRate || 1); // Fallback to 1 if the rate is not found
		setCurrencyCode(selectedCurrencyCode);
	};

	return (
		<>
			<ToastContainer
				toastClassName={({ type }) =>
					contextClass[type || 'dark'] +
					' relative flex p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer'
				}
				bodyClassName={() => 'text-sm font-white font-med block p-3'}
				position="bottom-left"
				autoClose={3000}
			/>
			<div className="flex justify-center items-center h-screen bg-slate-700">
				<ToastContainer
					toastClassName={({ type }) =>
						contextClass[type || 'dark'] +
						' relative flex p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer'
					}
					bodyClassName={() => 'text-sm font-white font-med block p-3'}
					position="bottom-left"
					autoClose={3000}
				/>
				{/* Currency Dropdown */}
				<div className="currency-selector">
					<select
						onChange={handleCurrencyChange}
						value={currencyCode}>
						{Object.keys(allRates).map((code) => (
							<option
								key={code}
								value={code}>
								{code}
							</option>
						))}
					</select>
				</div>
				<div className="product-cards-container">
					{products.map((product) => (
						<div
							key={product.prod_id}
							className="card">
							<img
								src={product.img}
								alt={product.title}
								className="card-img"
							/>
							<div className="card-body">
								<h5 className="card-title">{product.title}</h5>
								<p className="card-price">
									{(product.price * exchangeRate).toFixed(2)} {currencyCode}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</>
	);
}

export default Products;
