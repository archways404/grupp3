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
			<div className="flex justify-center items-center h-screen bg-gray-950">
				<div className="p-8 bg-gray-800 rounded-lg shadow-xl">
					<form
						onSubmit={handleSearchSubmit}
						className="flex flex-col items-center space-y-4">
						<input
							className="w-full h-12 px-4 rounded-md bg-gray-950 text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
							placeholder="Search for beers"
							type="text"
							value={searchValue}
							onChange={handleChangeSearch}
						/>
						<div className="flex space-x-3 w-full">
							<button
								type="submit"
								className="bg-green-500 hover:bg-green-600 text-black py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105 flex-grow">
								Search
							</button>
							<button
								onClick={() => onDisplaySearchChange({ display: true })}
								className="bg-red-500 hover:bg-red-600 text-black py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105 flex-grow">
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
