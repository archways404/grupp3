/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProgressBar from './ProgressBar';

function Location(props) {
	// Values
	const [location, setLocation] = useState('');
	const [cordinates, setCordinates] = useState({});
	const [displayLocation, setDisplayLocation] = useState(true);
	const { onDisplayLocationChange } = props; // Destructure the prop

	const progress = 5;

	function success(pos) {
		var crd = pos.coords;
		sessionStorage.setItem('latitude', crd.latitude);
		sessionStorage.setItem('longitude', crd.longitude);
		setCordinates({ latitude: crd.latitude, longitude: crd.longitude });
		onDisplayLocationChange(false);
	}

	function errors(err) {
		console.warn(`ERROR(${err.code}): ${err.message}`);
	}

	var options = {
		enableHighAccuracy: true,
		timeout: 30000,
		maximumAge: 0,
	};

	const fetchLocation = () => {
		if (navigator.geolocation) {
			navigator.permissions
				.query({ name: 'geolocation' })
				.then(function (result) {
					console.log(result);
					if (result.state === 'granted') {
						navigator.geolocation.getCurrentPosition(success, errors, options);
					} else if (result.state === 'prompt') {
						navigator.geolocation.getCurrentPosition(success, errors, options);
					} else if (result.state === 'denied') {
						navigator.geolocation.getCurrentPosition(success, errors, options);
					}
				});
		} else {
			console.log('Geolocation is not supported by this browser.');
		}
	};

	const handleChangeLocation = (event) => {
		setLocation(event.target.value);
	};

	const handleLocationSubmit = async (e) => {
		e.preventDefault(); // Prevent default form submission behavior
		try {
			const response = await fetch('http://localhost:9999/api/sendLocation/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ location: location }),
			});
			if (response.status === 200) {
				const data = await response.json();
				const cords = data.cordinates;
				setDisplayLocation(false);
				console.log(cords);
				sessionStorage.setItem('latitude', cords.latitude);
				sessionStorage.setItem('longitude', cords.longitude);
				toast.success(
					`Backend: Latitude:${cords.latitude}, Longitude:${cords.longitude}`,
					{
						position: toast.POSITION.TOP_CENTER,
					}
				);
				// reutrn value to parent
				onDisplayLocationChange(false);
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
			<div className="flex justify-center items-center h-screen bg-gray-950">
				{/* Form Container with Shadow and Padding */}
				<div className="p-8 bg-gray-800 rounded-lg shadow-xl">
					<form
						onSubmit={handleLocationSubmit}
						className="flex flex-col items-center space-y-4">
						<input
							className="w-full h-12 px-4 rounded-md bg-gray-950 text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
							placeholder="Enter your location"
							type="text"
							value={location}
							onChange={handleChangeLocation}
						/>
						<div className="flex space-x-3">
							<button
								type="submit"
								className="flex-1 bg-green-500 hover:bg-green-600 text-black py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105">
								Next
							</button>
						</div>
					</form>
					<br></br>
					<div className="flex space-x-3">
						<button
							className="flex-1 bg-green-500 hover:bg-green-600 text-black py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105"
							onClick={fetchLocation}>
							Fetch Location
						</button>
					</div>
				</div>
			</div>
			<ProgressBar progress={progress} />
		</>
	);
}

export default Location;
