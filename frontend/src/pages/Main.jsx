/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Location from '../components/Location';
import Search from '../components/Search';
import Products from '../components/Products';

function Main() {
	// Rendering
	const [displayLocation, setDisplayLocation] = useState(true);
  const [displaySearch, setDisplaySearch] = useState(false);
	const [displayProducts, setDisplayProducts] = useState(false);

	function handleDisplayLocationChange(Location) {
		console.log('Location: ', Location);
		if (Location === false) {
			setDisplayLocation(false);
			setDisplaySearch(true);
		} else {
			setDisplayLocation(true);
		}
	}

	function handleDisplaySearchChange(Search) {
		console.log('Search: ', Search);
		console.log('Search.display: ', Search.display);
		console.log('Search.searchValue: ', Search.searchValue);
		if (Search.display === false) {
			setDisplaySearch(false);
			setDisplayProducts(true);
		} else {
			setDisplayLocation(true);
		}
	}

	function handleDisplayProductsChange(Product) {
		console.log('Search: ', Product);
		console.log('Search.display: ', Product.display);
		if (Product.display === false) {
			setDisplayProducts(false);
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
			{displaySearch && (
				<Search onDisplaySearchChange={handleDisplaySearchChange} />
			)}
			{displayProducts && (
				<Products onDisplayProductsChange={handleDisplayProductsChange} />
			)}
		</>
	);
}

export default Main;
