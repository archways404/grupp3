/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Location from '../components/Location';
import Search from '../components/Search';

function Main() {
	// Rendering
	const [displayLocation, setDisplayLocation] = useState(true);
	const [displaySearch, setDisplaySearch] = useState(false);

	function handleDisplayLocationChange(newValue) {
		console.log('newValue: ', newValue);
		if (newValue === false) {
			setDisplayLocation(false);
		} else {
			setDisplayLocation(true);
		}
	}

	function handleDisplaySearchChange(newValue) {
		console.log('newValue: ', newValue);
		console.log('newValue.display: ', newValue.display);
		console.log('newValue.searchValue: ', newValue.searchValue);
		if (newValue.display === false) {
			setDisplayLocation(false);
		} else {
			setDisplayLocation(true);
		}
	}

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
			{displayLocation && (
				<Location onDisplayLocationChange={handleDisplayLocationChange} />
			)}
			{!displayLocation && (
				<Search onDisplaySearchChange={handleDisplaySearchChange} />
			)}
		</>
	);
}

export default Main;
