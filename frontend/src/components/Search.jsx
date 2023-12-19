/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Search(props) {
	// Values
	const [searchValue, setSearchValue] = useState('');

	const { onDisplaySearchChange } = props; // Destructure the prop

	const handleChangeSearch = (event) => {
		setSearchValue(event.target.value);
	};

	const handleSearchSubmit = async (e) => {
		e.preventDefault(); // Prevent default form submission behavior
		try {
			const response = await fetch('http://localhost:9999/api/Search/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ searchValue: searchValue }),
			});
			if (response.status === 200) {
				const data = await response.json();
				console.log(data.updatedProducts);
				toast.success(`Message recieved! ${data}`, {
					position: toast.POSITION.TOP_CENTER,
				});
				// Save search value to session storage
				sessionStorage.setItem('searchValue', searchValue);
				sessionStorage.setItem('searchResults', JSON.stringify(data));
				// reutrn value to parent
				onDisplaySearchChange({ display: false, searchValue: searchValue });
			}
		} catch (err) {
			console.log(err);
			toast.error(`Response from backend: \n ${err}`, {
				position: toast.POSITION.TOP_CENTER,
			});
		}
	};

	const contextClass = {
		success: 'bg-green-700',
		error: 'bg-red-700',
		info: 'bg-gray-700',
		warning: 'bg-orange-500',
		default: 'bg-indigo-700',
		dark: 'bg-white-600 font-gray-300',
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
				<form
					onSubmit={handleSearchSubmit}
					className="flex flex-col items-center space-y-4">
					<input
						className="w-64 h-12 px-4 rounded-md bg-slate-800 text-gray-200"
						placeholder="Search for beers"
						type="text"
						value={searchValue}
						onChange={handleChangeSearch}
					/>
					<button
						type="submit"
						className="bg-green-500 hover:bg-green-600 text-black py-2 px-4 rounded">
						Search
					</button>
					<button
						onClick={() => onDisplaySearchChange({ display: true })}
						className="bg-red-500 hover:bg-red-600 text-black py-2 px-4 rounded">
						Back
					</button>
				</form>
			</div>
		</>
	);
}

export default Search;
