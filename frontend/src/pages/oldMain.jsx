/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Main() {
	// Values
	const [location, setLocation] = useState('');
	const [cordinates, setCordinates] = useState({});
	const [searchValue, setSearchValue] = useState('');

	// Rendering
	const [displayLocation, setDisplayLocation] = useState(true);
	const [displayHome, setDisplayHome] = useState(false);

	function success(pos) {
		var crd = pos.coords;
		console.log(crd);
		console.log('Your current position is:');
		console.log(`Latitude : ${crd.latitude}`);
		console.log(`Longitude: ${crd.longitude}`);
		setCordinates({ latitude: crd.latitude, longitude: crd.longitude });
		setDisplayLocation(false);
	}

	function errors(err) {
		console.warn(`ERROR(${err.code}): ${err.message}`);
	}

	var options = {
		enableHighAccuracy: true,
		timeout: 5000,
		maximumAge: 0,
	};

	useEffect(() => {
		if (navigator.geolocation) {
			navigator.permissions
				.query({ name: 'geolocation' })
				.then(function (result) {
					console.log(result);
					if (result.state === 'granted') {
						navigator.geolocation.getCurrentPosition(success, errors, options);
						//If granted then you can directly call your function here
					} else if (result.state === 'prompt') {
						navigator.geolocation.getCurrentPosition(success, errors, options);
						//If prompt then the user will be asked to give permission
					} else if (result.state === 'denied') {
						navigator.geolocation.getCurrentPosition(success, errors, options);
						//If denied then you have to show instructions to enable location
					}
				});
		} else {
			console.log('Geolocation is not supported by this browser.');
		}
	}, []);

	const handleChangeLocation = (event) => {
		setLocation(event.target.value);
	};

	const handleLocationSubmit = async (e) => {
		e.preventDefault(); // Prevent default form submission behavior
		try {
			const response = await fetch('http://localhost:9999/api/test/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ test: location }),
			});
			if (response.status === 200) {
				const data = await response.json();
				const testData = data.test;
				setDisplayLocation(false);
				console.log(data.test);
				toast.success(`Message recieved! ${testData}`, {
					position: toast.POSITION.TOP_CENTER,
				});
			}
		} catch (err) {
			console.log(err);
			toast.error(`Response from backend: \n ${err}`, {
				position: toast.POSITION.TOP_CENTER,
			});
		}
	};

	const handleChangeSearch = (event) => {
		setSearchValue(event.target.value);
	};

	const handleSearchSubmit = async (e) => {
		e.preventDefault(); // Prevent default form submission behavior
		try {
			const response = await fetch('http://localhost:9999/api/test/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ test: searchValue }),
			});
			if (response.status === 200) {
				const data = await response.json();
				const testData = data.test;
				console.log(data.test);
				toast.success(`Message recieved! ${testData}`, {
					position: toast.POSITION.TOP_CENTER,
				});
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
			{displayLocation && (
				<div className="flex justify-center items-center h-screen bg-slate-700">
					<form
						onSubmit={handleLocationSubmit}
						className="flex flex-col items-center space-y-4">
						<input
							className="w-64 h-12 px-4 rounded-md bg-slate-800 text-gray-200"
							placeholder="Enter your location"
							type="text"
							value={location}
							onChange={handleChangeLocation}
						/>
						<button
							type="submit"
							className="bg-green-500 hover:bg-green-600 text-black py-2 px-4 rounded">
							Next
						</button>
					</form>
				</div>
			)}
			{!displayLocation && (
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
							onClick={() => setDisplayLocation(true)}
							className="bg-red-500 hover:bg-red-600 text-black py-2 px-4 rounded">
							Back
						</button>
					</form>
				</div>
			)}
		</>
	);
}

export default Main;
