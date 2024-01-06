/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import ProgressBar from './ProgressBar';

function Search(props) {
	// Values
	const [searchValue, setSearchValue] = useState('');

	const { onDisplaySearchChange } = props; // Destructure the prop

	const progress = 10;

	const handleChangeSearch = (event) => {
		setSearchValue(event.target.value);
	};

	const handleSearchSubmit = async (e) => {
		e.preventDefault(); // Prevent default form submission behavior
		try {
			const cord_long = sessionStorage.getItem('longitude');
			const cord_lat = sessionStorage.getItem('latitude');
			console.log(
				'🚀 ~ file: Search.jsx:20 ~ handleSearchSubmit ~ cord_long:',
				cord_long
			);
			console.log(
				'🚀 ~ file: Search.jsx:22 ~ handleSearchSubmit ~ cord_lat:',
				cord_lat
			);

			const response = await fetch('http://localhost:9999/api/Search/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					searchValue: searchValue,
					cord_long: cord_long,
					cord_lat: cord_lat,
				}),
			});
			if (response.status === 200) {
				const data = await response.json();
				console.log(data.updatedProducts);
				// Save search value to session storage
				sessionStorage.setItem('searchValue', searchValue);
				sessionStorage.setItem('searchResults', JSON.stringify(data));
				sessionStorage.setItem(
					'localExchangeRate',
					JSON.stringify(data.exchangeRate)
				);
				sessionStorage.setItem(
					'localCurrencyCode',
					JSON.stringify(data.currencyCode)
				);
				// reutrn value to parent
				onDisplaySearchChange({ display: false, searchValue: searchValue });
			}
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<>
			<div className="flex justify-center items-center h-screen bg-gray-900">
				{/* Main Container with a Consistent Modern Layout */}
				<div className="w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-xl">
					<h1 className="text-green-500 text-4xl font-bold mb-6 text-center">
						DK BEER INTERNATIONAL
					</h1>

					{/* Form Container */}
					<form
						onSubmit={handleSearchSubmit}
						className="flex flex-col space-y-4">
						<input
							className="w-full h-12 px-4 rounded-md bg-gray-700 text-gray-300 border border-gray-600 focus:border-green-500 focus:outline-none"
							placeholder="Search for beers (blank search for all)"
							type="text"
							value={searchValue}
							onChange={handleChangeSearch}
						/>
						<div className="flex space-x-3">
							<button
								type="submit"
								className="flex-1 bg-green-600 hover:bg-green-700 text-black py-2 px-4 rounded-md transition duration-300 ease-in-out hover:font-bold">
								Search
							</button>
							<button
								onClick={() => onDisplaySearchChange({ display: true })}
								className="flex-1 bg-red-600 hover:bg-red-700 text-black hover:font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out">
								Back
							</button>
						</div>
					</form>
				</div>
			</div>
			<ProgressBar progress={progress} />
		</>
	);
}

export default Search;
