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
	const [selectedProducts, setSelectedProducts] = useState([]);
	const { onDisplayProductsChange } = props; // Destructure the prop

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

				{/* Product Cards Container */}
				<div className="product-cards-container w-full px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
					{products.map((product) => (
						<div
							key={product.prod_id}
							className="card bg-white rounded-lg shadow-lg overflow-hidden max-w-sm">
							<img
								src={product.img}
								alt={product.title}
								className="card-img object-cover h-48 w-full"
							/>
							<div className="card-body p-4">
								<h5 className="card-title text-lg font-semibold truncate">
									{product.title}
								</h5>
								<p className="card-price text-xl font-bold">
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
